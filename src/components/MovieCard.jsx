import { Star, Calendar, Heart } from 'lucide-react';
import { getImageUrl, formatMovieData } from '../services/tmdbApi.js';

/**
 * MovieCard component to display movie information
 * @param {Object} props - Component props
 * @param {Object} props.movie - Movie data object
 * @param {Function} props.onClick - Callback when card is clicked
 * @param {Function} props.onFavoriteToggle - Callback when favorite button is clicked
 * @param {boolean} props.isFavorite - Whether movie is in favorites
 */
const MovieCard = ({ 
  movie, 
  onClick, 
  onFavoriteToggle, 
  isFavorite = false 
}) => {
  const formattedMovie = formatMovieData(movie);
  
  const handleCardClick = () => {
    if (onClick) {
      onClick(formattedMovie);
    }
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent card click when clicking favorite button
    if (onFavoriteToggle) {
      onFavoriteToggle(formattedMovie);
    }
  };

  const formatRating = (rating) => {
    return rating ? rating.toFixed(1) : 'N/A';
  };

  return (
    <div 
      className="bg-card border border-border rounded-lg overflow-hidden shadow-sm 
               hover:shadow-md transition-all duration-300 cursor-pointer group
               hover:scale-105 hover:border-ring"
      onClick={handleCardClick}
    >
      {/* Movie Poster */}
      <div className="relative aspect-[2/3] overflow-hidden bg-muted">
        <img
          src={formattedMovie.posterUrl || `https://via.placeholder.com/342x513/1f2937/ffffff?text=${encodeURIComponent(formattedMovie.title)}`}
          alt={`${formattedMovie.title} poster`}
          className="w-full h-full object-cover transition-transform duration-300 
                   group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm
                     transition-all duration-200 hover:scale-110
                     ${isFavorite 
                       ? 'bg-red-500/80 text-white' 
                       : 'bg-black/50 text-white hover:bg-black/70'
                     }`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart 
            className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} 
          />
        </button>

        {/* Rating Badge */}
        {formattedMovie.rating > 0 && (
          <div className="absolute bottom-2 left-2 bg-black/80 text-white px-2 py-1 
                        rounded-md text-sm font-medium flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            {formatRating(formattedMovie.rating)}
          </div>
        )}
      </div>

      {/* Movie Info */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2 
                     group-hover:text-primary transition-colors duration-200">
          {formattedMovie.title}
        </h3>

        {/* Release Year */}
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
          <Calendar className="h-4 w-4" />
          <span>{formattedMovie.year}</span>
        </div>

        {/* Overview */}
        <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
          {formattedMovie.overview || 'No description available.'}
        </p>

        {/* Genres */}
        {formattedMovie.genres && formattedMovie.genres.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {formattedMovie.genres.slice(0, 2).map((genre) => (
              <span
                key={genre.id}
                className="px-2 py-1 bg-secondary text-secondary-foreground 
                         text-xs rounded-md font-medium"
              >
                {genre.name}
              </span>
            ))}
            {formattedMovie.genres.length > 2 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground 
                             text-xs rounded-md font-medium">
                +{formattedMovie.genres.length - 2}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;

