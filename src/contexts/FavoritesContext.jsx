import { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const FavoritesContext = createContext();

// Custom hook to use the favorites context
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

// Favorites provider component
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    loadFavorites();
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    if (favorites.length >= 0) {
      try {
        localStorage.setItem('movieFavorites', JSON.stringify(favorites));
      } catch (error) {
        console.error('Error saving favorites to localStorage:', error);
      }
    }
  }, [favorites]);

  /**
   * Load favorites from localStorage
   */
  const loadFavorites = () => {
    try {
      const savedFavorites = localStorage.getItem('movieFavorites');
      if (savedFavorites) {
        const parsedFavorites = JSON.parse(savedFavorites);
        setFavorites(parsedFavorites);
      }
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
      setFavorites([]);
    }
  };

  /**
   * Add a movie to favorites
   * @param {Object} movie - Movie object to add
   */
  const addToFavorites = (movie) => {
    const movieId = movie.id;
    if (!favorites.includes(movieId)) {
      setFavorites(prev => [...prev, movieId]);
      
      // Also store the full movie object for the favorites page
      setFavoriteMovies(prev => {
        const existing = prev.find(m => m.id === movieId);
        if (!existing) {
          return [...prev, movie];
        }
        return prev;
      });
    }
  };

  /**
   * Remove a movie from favorites
   * @param {number} movieId - Movie ID to remove
   */
  const removeFromFavorites = (movieId) => {
    setFavorites(prev => prev.filter(id => id !== movieId));
    setFavoriteMovies(prev => prev.filter(movie => movie.id !== movieId));
  };

  /**
   * Toggle favorite status of a movie
   * @param {Object} movie - Movie object to toggle
   */
  const toggleFavorite = (movie) => {
    const movieId = movie.id;
    if (favorites.includes(movieId)) {
      removeFromFavorites(movieId);
    } else {
      addToFavorites(movie);
    }
  };

  /**
   * Check if a movie is in favorites
   * @param {number} movieId - Movie ID to check
   * @returns {boolean} Whether the movie is in favorites
   */
  const isFavorite = (movieId) => {
    return favorites.includes(movieId);
  };

  /**
   * Get the count of favorite movies
   * @returns {number} Number of favorite movies
   */
  const getFavoritesCount = () => {
    return favorites.length;
  };

  /**
   * Clear all favorites
   */
  const clearFavorites = () => {
    setFavorites([]);
    setFavoriteMovies([]);
  };

  const value = {
    favorites,
    favoriteMovies,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    getFavoritesCount,
    clearFavorites,
    loadFavorites
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

