import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar.jsx';
import MovieList from '../components/MovieList.jsx';
import { searchMovies, getPopularMovies } from '../services/tmdbApi.js';
import { useFavorites } from '../contexts/FavoritesContext.jsx';

/**
 * Home page component with search functionality
 */
const Home = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Load popular movies on initial load
  useEffect(() => {
    loadPopularMovies();
  }, []);

  /**
   * Load popular movies for initial display
   */
  const loadPopularMovies = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getPopularMovies();
      setMovies(data.results || []);
      setSearchQuery('');
    } catch (err) {
      setError('Failed to load popular movies. Please try again.');
      console.error('Error loading popular movies:', err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle search functionality
   * @param {string} query - Search query
   */
  const handleSearch = async (query) => {
    if (!query.trim()) {
      // If empty query, load popular movies
      loadPopularMovies();
      return;
    }

    setIsLoading(true);
    setError(null);
    setSearchQuery(query);

    try {
      const data = await searchMovies(query);
      setMovies(data.results || []);
    } catch (err) {
      setError('Failed to search movies. Please try again.');
      console.error('Error searching movies:', err);
    } finally {
      setIsLoading(false);
    }
  };

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

  return (
    <div className="bg-background">
      {/* Search Section */}
      <section className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Discover Movies
            </h1>
            <p className="text-muted-foreground text-lg">
              Search for your next favorite movie
            </p>
          </div>
          
          {/* Search Bar */}
          <SearchBar 
            onSearch={handleSearch}
            isLoading={isLoading}
          />
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Section Title */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            {searchQuery ? `Search Results` : 'Popular Movies'}
          </h2>
          <p className="text-muted-foreground">
            {searchQuery 
              ? `Results for "${searchQuery}"`
              : 'Trending movies right now'
            }
          </p>
        </div>

        {/* Movie List */}
        <MovieList
          movies={movies}
          isLoading={isLoading}
          error={error}
          onMovieClick={handleMovieClick}
          onFavoriteToggle={handleFavoriteToggle}
          favorites={favorites}
          searchQuery={searchQuery}
        />
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

export default Home;

