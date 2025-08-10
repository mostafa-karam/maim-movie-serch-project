import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Calendar, Clock, Heart, Play, Users } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { getMovieDetails, getImageUrl, formatMovieData } from '../services/tmdbApi.js';
import { useFavorites } from '../contexts/FavoritesContext.jsx';

/**
 * MovieDetails page component
 */
const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      loadMovieDetails(id);
    }
  }, [id]);

  /**
   * Load movie details from API
   */
  const loadMovieDetails = async (movieId) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await getMovieDetails(movieId);
      setMovie(formatMovieData(data));
    } catch (err) {
      setError('Failed to load movie details. Please try again.');
      console.error('Error loading movie details:', err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Toggle favorite status
   */
  const handleFavoriteToggle = () => {
    if (movie) {
      toggleFavorite(movie);
    }
  };

  /**
   * Go back to previous page
   */
  const handleGoBack = () => {
    navigate(-1);
  };

  /**
   * Format runtime to hours and minutes
   */
  const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  /**
   * Format release date
   */
  const formatReleaseDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-32 mb-8"></div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-muted aspect-[2/3] rounded-lg"></div>
              <div className="md:col-span-2 space-y-4">
                <div className="h-8 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Button 
            onClick={handleGoBack}
            variant="outline"
            className="mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
          
          <div className="text-center py-16">
            <div className="mb-4 p-4 bg-destructive/10 rounded-full w-fit mx-auto">
              <Star className="h-12 w-12 text-destructive" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Movie Not Found
            </h2>
            <p className="text-muted-foreground mb-4">
              {error}
            </p>
            <Button onClick={handleGoBack}>
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Movie not found
  if (!movie) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Button 
            onClick={handleGoBack}
            variant="outline"
            className="mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
          
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Movie Not Found
            </h2>
            <p className="text-muted-foreground mb-4">
              The movie you're looking for doesn't exist.
            </p>
            <Button onClick={handleGoBack}>
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Backdrop */}
      <div 
        className="relative h-96 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: movie.backdropUrl 
            ? `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${movie.backdropUrl})`
            : 'linear-gradient(135deg, #1f2937 0%, #374151 100%)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        <div className="relative container mx-auto px-4 py-8 h-full flex items-end">
          <Button 
            onClick={handleGoBack}
            variant="outline"
            className="absolute top-8 left-4 bg-black/50 border-white/20 text-white hover:bg-black/70"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>

      {/* Movie Details */}
      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Movie Poster */}
          <div className="flex justify-center md:justify-start">
            <div className="relative">
              <img
                src={movie.posterUrl || `https://via.placeholder.com/500x750/1f2937/ffffff?text=${encodeURIComponent(movie.title)}`}
                alt={`${movie.title} poster`}
                className="w-80 rounded-lg shadow-2xl"
              />
              
              {/* Favorite Button */}
              <Button
                onClick={handleFavoriteToggle}
                className={`absolute top-4 right-4 p-3 rounded-full
                          ${isFavorite(movie?.id) 
                            ? 'bg-red-500 hover:bg-red-600 text-white' 
                            : 'bg-black/50 hover:bg-black/70 text-white'
                          }`}
              >
                <Heart className={`h-5 w-5 ${isFavorite(movie?.id) ? 'fill-current' : ''}`} />
              </Button>
            </div>
          </div>

          {/* Movie Info */}
          <div className="md:col-span-2 space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {movie.title}
              </h1>
              
              <div className="flex items-center gap-4 text-muted-foreground">
                {movie.rating > 0 && (
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{movie.rating.toFixed(1)}</span>
                    <span className="text-sm">({movie.voteCount?.toLocaleString()} votes)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Movie Meta */}
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatReleaseDate(movie.releaseDate)}</span>
              </div>
              
              {movie.runtime && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{formatRuntime(movie.runtime)}</span>
                </div>
              )}
            </div>

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-secondary text-secondary-foreground 
                             rounded-full text-sm font-medium"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {/* Overview */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">
                Overview
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {movie.overview || 'No overview available for this movie.'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                Watch Trailer
              </Button>
              
              <Button variant="outline" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                View Cast
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">
            Movie data provided by{' '}
            <a 
              href="https://www.themoviedb.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              The Movie Database (TMDB)
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MovieDetails;

