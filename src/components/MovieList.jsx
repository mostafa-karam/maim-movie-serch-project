import { Film, Search } from 'lucide-react';
import MovieCard from './MovieCard.jsx';

/**
 * MovieList component to display a grid of movies
 * @param {Object} props - Component props
 * @param {Array} props.movies - Array of movie objects
 * @param {boolean} props.isLoading - Loading state
 * @param {string} props.error - Error message if any
 * @param {Function} props.onMovieClick - Callback when a movie is clicked
 * @param {Function} props.onFavoriteToggle - Callback when favorite is toggled
 * @param {Array} props.favorites - Array of favorite movie IDs
 * @param {string} props.searchQuery - Current search query for display
 */
const MovieList = ({ 
  movies = [], 
  isLoading = false, 
  error = null,
  onMovieClick,
  onFavoriteToggle,
  favorites = [],
  searchQuery = ''
}) => {
  
  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="bg-muted aspect-[2/3] rounded-lg mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-3 bg-muted rounded w-1/2"></div>
            <div className="h-3 bg-muted rounded w-full"></div>
            <div className="h-3 bg-muted rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  );

  // Empty state component
  const EmptyState = ({ hasSearched }) => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 p-4 bg-muted rounded-full">
        {hasSearched ? (
          <Search className="h-12 w-12 text-muted-foreground" />
        ) : (
          <Film className="h-12 w-12 text-muted-foreground" />
        )}
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        {hasSearched ? 'No movies found' : 'Start your movie search'}
      </h3>
      <p className="text-muted-foreground max-w-md">
        {hasSearched 
          ? `We couldn't find any movies matching "${searchQuery}". Try searching with different keywords.`
          : 'Use the search bar above to discover amazing movies. Try searching for your favorite titles, actors, or genres.'
        }
      </p>
    </div>
  );

  // Error state component
  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 p-4 bg-destructive/10 rounded-full">
        <Film className="h-12 w-12 text-destructive" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        Something went wrong
      </h3>
      <p className="text-muted-foreground max-w-md mb-4">
        {error || 'We encountered an error while fetching movies. Please try again.'}
      </p>
      <button 
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        Try Again
      </button>
    </div>
  );

  // Check if movie is in favorites
  const isFavorite = (movieId) => {
    return favorites.includes(movieId);
  };

  // Show loading state
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  // Show error state
  if (error) {
    return <ErrorState />;
  }

  // Show empty state
  if (movies.length === 0) {
    return <EmptyState hasSearched={!!searchQuery} />;
  }

  // Show movies grid
  return (
    <div className="space-y-6">
      {/* Results header */}
      {searchQuery && (
        <div className="text-center">
          <p className="text-muted-foreground">
            Found {movies.length} movie{movies.length !== 1 ? 's' : ''} for "{searchQuery}"
          </p>
        </div>
      )}

      {/* Movies grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={onMovieClick}
            onFavoriteToggle={onFavoriteToggle}
            isFavorite={isFavorite(movie.id)}
          />
        ))}
      </div>

      {/* Load more hint */}
      {movies.length > 0 && movies.length % 20 === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground text-sm">
            Showing {movies.length} results. Search for more specific terms to refine your results.
          </p>
        </div>
      )}
    </div>
  );
};

export default MovieList;

