// TMDB API Service
import { API_CONFIG } from '../config/api.js';
import { mockSearchMovies, mockGetMovieDetails, mockGetPopularMovies } from './mockData.js';

const { TMDB_API_KEY, TMDB_BASE_URL, TMDB_IMAGE_BASE_URL, USE_MOCK_DATA } = API_CONFIG;

// Image sizes available: w92, w154, w185, w342, w500, w780, original
export const IMAGE_SIZES = {
  small: 'w185',
  medium: 'w342',
  large: 'w500',
  original: 'original'
};

/**
 * Search for movies by title
 * @param {string} query - Search query
 * @param {number} page - Page number (default: 1)
 * @returns {Promise<Object>} Search results
 */
export const searchMovies = async (query, page = 1) => {
  // Use mock data if configured
  if (USE_MOCK_DATA) {
    return await mockSearchMovies(query, page);
  }

  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

/**
 * Get movie details by ID
 * @param {number} movieId - Movie ID
 * @returns {Promise<Object>} Movie details
 */
export const getMovieDetails = async (movieId) => {
  // Use mock data if configured
  if (USE_MOCK_DATA) {
    return await mockGetMovieDetails(movieId);
  }

  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=credits,videos`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

/**
 * Get popular movies
 * @param {number} page - Page number (default: 1)
 * @returns {Promise<Object>} Popular movies
 */
export const getPopularMovies = async (page = 1) => {
  // Use mock data if configured
  if (USE_MOCK_DATA) {
    return await mockGetPopularMovies(page);
  }

  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

/**
 * Build image URL
 * @param {string} path - Image path from API
 * @param {string} size - Image size (default: medium)
 * @returns {string} Complete image URL
 */
export const getImageUrl = (path, size = IMAGE_SIZES.medium) => {
  if (!path) return null;
  
  // For mock data, return a placeholder image
  if (USE_MOCK_DATA) {
    return `https://via.placeholder.com/342x513/1f2937/ffffff?text=${encodeURIComponent('Movie Poster')}`;
  }
  
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

/**
 * Format movie data for consistent use across components
 * @param {Object} movie - Raw movie data from API
 * @returns {Object} Formatted movie data
 */
export const formatMovieData = (movie) => {
  // If the movie already appears to be formatted (idempotency), reuse existing fields
  const isAlreadyFormatted = movie && (movie.posterUrl || movie.backdropUrl || movie.year !== undefined);

  const posterPath = movie.poster_path ?? movie.posterPath ?? null;
  const backdropPath = movie.backdrop_path ?? movie.backdropPath ?? null;
  const releaseDate = movie.release_date ?? movie.releaseDate ?? null;
  const rating = movie.vote_average ?? movie.rating ?? null;
  const voteCount = movie.vote_count ?? movie.voteCount ?? null;

  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    releaseDate,
    year: releaseDate ? new Date(releaseDate).getFullYear() : (movie.year ?? 'N/A'),
    rating,
    voteCount,
    posterPath,
    backdropPath,
    posterUrl: movie.posterUrl ?? getImageUrl(posterPath),
    backdropUrl: movie.backdropUrl ?? getImageUrl(backdropPath, IMAGE_SIZES.large),
    genres: movie.genres || [],
    runtime: movie.runtime,
    popularity: movie.popularity
  };
};

