// Mock data for development and testing

export const mockMovies = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    release_date: "1994-09-23",
    vote_average: 9.3,
    vote_count: 2500000,
    poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    backdrop_path: "/iNh3BivHyg5sQRPP1KOkzguEX0H.jpg",
    genres: [
      { id: 18, name: "Drama" },
      { id: 80, name: "Crime" }
    ],
    runtime: 142,
    popularity: 95.5
  },
  {
    id: 2,
    title: "The Godfather",
    overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    release_date: "1972-03-24",
    vote_average: 9.2,
    vote_count: 1800000,
    poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
    genres: [
      { id: 18, name: "Drama" },
      { id: 80, name: "Crime" }
    ],
    runtime: 175,
    popularity: 92.1
  },
  {
    id: 3,
    title: "The Dark Knight",
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    release_date: "2008-07-18",
    vote_average: 9.0,
    vote_count: 2200000,
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop_path: "/hqkIcbrOHL86UncnHIsHVcVmzue.jpg",
    genres: [
      { id: 28, name: "Action" },
      { id: 80, name: "Crime" },
      { id: 18, name: "Drama" }
    ],
    runtime: 152,
    popularity: 98.7
  },
  {
    id: 4,
    title: "Pulp Fiction",
    overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    release_date: "1994-10-14",
    vote_average: 8.9,
    vote_count: 1900000,
    poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    backdrop_path: "/4cDFJr4HnXN5AdPw4AKrmLlMWdO.jpg",
    genres: [
      { id: 80, name: "Crime" },
      { id: 18, name: "Drama" }
    ],
    runtime: 154,
    popularity: 89.3
  },
  {
    id: 5,
    title: "Forrest Gump",
    overview: "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
    release_date: "1994-07-06",
    vote_average: 8.8,
    vote_count: 2100000,
    poster_path: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    backdrop_path: "/7c8QeNjmJlmI5Tn3V5RjQu6Bm7O.jpg",
    genres: [
      { id: 18, name: "Drama" },
      { id: 10749, name: "Romance" }
    ],
    runtime: 142,
    popularity: 87.9
  }
];

/**
 * Mock search function
 * @param {string} query - Search query
 * @param {number} page - Page number
 * @returns {Promise<Object>} Mock search results
 */
export const mockSearchMovies = async (query, page = 1) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const filteredMovies = mockMovies.filter(movie =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );
  
  return {
    page: page,
    results: filteredMovies,
    total_pages: 1,
    total_results: filteredMovies.length
  };
};

/**
 * Mock get movie details function
 * @param {number} movieId - Movie ID
 * @returns {Promise<Object>} Mock movie details
 */
export const mockGetMovieDetails = async (movieId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const movie = mockMovies.find(m => m.id === parseInt(movieId));
  
  if (!movie) {
    throw new Error('Movie not found');
  }
  
  return {
    ...movie,
    credits: {
      cast: [
        { id: 1, name: "Actor One", character: "Character One", profile_path: "/actor1.jpg" },
        { id: 2, name: "Actor Two", character: "Character Two", profile_path: "/actor2.jpg" }
      ]
    },
    videos: {
      results: [
        { id: "1", key: "dQw4w9WgXcQ", name: "Official Trailer", type: "Trailer", site: "YouTube" }
      ]
    }
  };
};

/**
 * Mock get popular movies function
 * @param {number} page - Page number
 * @returns {Promise<Object>} Mock popular movies
 */
export const mockGetPopularMovies = async (page = 1) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return {
    page: page,
    results: mockMovies,
    total_pages: 1,
    total_results: mockMovies.length
  };
};

