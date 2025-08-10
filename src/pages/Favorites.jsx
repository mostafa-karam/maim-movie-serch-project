import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import MovieList from '../components/MovieList.jsx';
import { useFavorites } from '../contexts/FavoritesContext.jsx';

/**
 * Favorites page component
 */
const Favorites = () => {
  const navigate = useNavigate();
  const { 
    favoriteMovies, 
    toggleFavorite, 
    getFavoritesCount, 
    clearFavorites,
    isFavorite 
  } = useFavorites();

  /**
   * Handle movie card click - navigate to details
   * @param {Object} movie - Movie object
   */
  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.id}`);
  };

  /**
   * Handle favorite toggle
   * @param {Object} movie - Movie object
   */
  const handleFavoriteToggle = (movie) => {
    toggleFavorite(movie);
  };

  /**
   * Handle clear all favorites
   */
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all movies from your favorites?')) {
      clearFavorites();
    }
  };

  /**
   * Go back to previous page
   */
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <Button 
              onClick={handleGoBack}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>

            {favoriteMovies.length > 0 && (
              <Button 
                onClick={handleClearAll}
                variant="destructive"
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Clear All
              </Button>
            )}
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Heart className="h-8 w-8 text-red-500 fill-current" />
              <h1 className="text-4xl font-bold text-foreground">
                My Favorites
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              {getFavoritesCount() === 0 
                ? 'You haven\'t added any movies to your favorites yet'
                : `${getFavoritesCount()} movie${getFavoritesCount() !== 1 ? 's' : ''} in your collection`
              }
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {favoriteMovies.length === 0 ? (
          // Empty state
          <div className="text-center py-16">
            <div className="mb-6 p-6 bg-muted rounded-full w-fit mx-auto">
              <Heart className="h-16 w-16 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              No favorites yet
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Start exploring movies and click the heart icon to add them to your favorites. 
              Your favorite movies will appear here for easy access.
            </p>
            <Button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Browse Movies
            </Button>
          </div>
        ) : (
          // Favorites list
          <div className="space-y-6">
            {/* Section Title */}
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Your Favorite Movies
              </h2>
              <p className="text-muted-foreground">
                Movies you've saved for later viewing
              </p>
            </div>

            {/* Movies Grid */}
            <MovieList
              movies={favoriteMovies}
              isLoading={false}
              error={null}
              onMovieClick={handleMovieClick}
              onFavoriteToggle={handleFavoriteToggle}
              favorites={favoriteMovies.map(movie => movie.id)}
              searchQuery=""
            />

            {/* Tips */}
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <h3 className="font-semibold text-foreground mb-2">
                💡 Pro Tip
              </h3>
              <p className="text-muted-foreground text-sm">
                Click on any movie card to view detailed information, or click the heart icon to remove it from your favorites.
              </p>
            </div>
          </div>
        )}
      </main>

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

export default Favorites;

