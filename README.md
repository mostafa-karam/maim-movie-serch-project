# Movie Search App

A modern, responsive React application for discovering and managing your favorite movies. Built with React, TypeScript, Tailwind CSS, and The Movie Database (TMDB) API.


## 🎬 Features

### Core Functionality

- **Movie Search**: Search for movies by title with real-time results
- **Movie Details**: View comprehensive information including ratings, cast, and synopsis
- **Favorites Management**: Add/remove movies from your personal favorites collection
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### User Experience

- **Intuitive Navigation**: Clean navigation bar with active state indicators
- **Loading States**: Smooth loading animations and skeleton screens
- **Error Handling**: Graceful error messages and fallback states
- **Persistent Favorites**: Favorites saved to localStorage for persistence across sessions

### Technical Features

- **Modern React**: Built with React 18+ using hooks and functional components
- **React Router**: Client-side routing for seamless navigation
- **Context API**: Centralized state management for favorites
- **API Integration**: Integration with The Movie Database (TMDB) API
- **Mock Data Support**: Development mode with mock data for testing

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or pnpm package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd movie-search-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Configure API Key** (Optional)
   - Get a free API key from [The Movie Database (TMDB)](https://www.themoviedb.org/settings/api)
   - Update `src/config/api.js`:

     ```javascript
     export const API_CONFIG = {
       TMDB_API_KEY: 'your_api_key_here',
       USE_MOCK_DATA: false, // Set to false to use real API
       // ... other config
     };
     ```

4. **Start the development server**

   ```bash
   npm run dev
   # or
   pnpm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

## 📱 Usage Guide

### Searching for Movies

1. Use the search bar on the home page
2. Type any movie title (e.g., "The Dark Knight", "Inception")
3. Results will appear automatically as you type
4. Click on any movie card to view detailed information

### Managing Favorites

1. Click the heart icon on any movie card to add to favorites
2. The heart will turn red to indicate it's favorited
3. Navigate to the "Favorites" page using the navigation bar
4. View all your favorite movies in one place
5. Click the heart icon again to remove from favorites

### Viewing Movie Details

1. Click on any movie card from search results or favorites
2. View comprehensive information including:
   - Movie poster and backdrop
   - Title, rating, and release date
   - Runtime and genres
   - Plot synopsis
   - Cast information (coming soon)
3. Use the "Go Back" button to return to the previous page

## 🏗️ Project Structure

```structure
movie-search-app/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── MovieCard.jsx  # Individual movie card component
│   │   ├── MovieList.jsx  # Grid of movie cards
│   │   ├── Navigation.jsx # App navigation bar
│   │   └── SearchBar.jsx  # Search input component
│   ├── contexts/          # React contexts
│   │   └── FavoritesContext.jsx # Favorites state management
│   ├── pages/             # Page components
│   │   ├── Home.jsx       # Home page with search
│   │   ├── MovieDetails.jsx # Movie details page
│   │   └── Favorites.jsx  # Favorites page
│   ├── services/          # API and data services
│   │   ├── tmdbApi.js     # TMDB API integration
│   │   └── mockData.js    # Mock data for development
│   ├── config/            # Configuration files
│   │   └── api.js         # API configuration
│   ├── App.jsx            # Main app component
│   └── main.jsx           # App entry point
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## 🛠️ Technology Stack

### Frontend Framework

- **React 18+**: Modern React with hooks and functional components
- **React Router DOM**: Client-side routing and navigation
- **Vite**: Fast build tool and development server

### Styling & UI

- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality, accessible UI components
- **Lucide React**: Beautiful, customizable icons

### State Management

- **React Context API**: Centralized favorites management
- **localStorage**: Persistent favorites storage

### API Integration

- **The Movie Database (TMDB) API**: Movie data and images
- **Fetch API**: HTTP requests for data fetching

## 🎨 Design System

### Color Palette

The app uses a modern, dark-themed color scheme:

- **Background**: Dark gray (`#1f2937`)
- **Cards**: Slightly lighter gray (`#374151`)
- **Primary**: Blue accent for interactive elements
- **Accent**: Red for favorites and important actions
- **Text**: High contrast white/gray for readability

### Typography

- **Headings**: Bold, clear hierarchy
- **Body Text**: Readable font sizes with proper line spacing
- **UI Text**: Consistent sizing for buttons and labels

### Layout

- **Responsive Grid**: Adaptive movie card grid (1-5 columns)
- **Container**: Centered content with appropriate max-widths
- **Spacing**: Consistent padding and margins throughout

## 🔧 Configuration

### API Configuration

Edit `src/config/api.js` to configure the application:

```javascript
export const API_CONFIG = {
  // Your TMDB API key
  TMDB_API_KEY: 'your_api_key_here',
  
  // Use mock data for development (true) or real API (false)
  USE_MOCK_DATA: true,
  
  // API endpoints
  TMDB_BASE_URL: 'https://api.themoviedb.org/3',
  TMDB_IMAGE_BASE_URL: 'https://image.tmdb.org/t/p'
};
```

### Environment Variables

For production deployments, use environment variables:

- `VITE_TMDB_API_KEY`: Your TMDB API key
- `VITE_USE_MOCK_DATA`: Set to 'false' for production

## 🧪 Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

### Mock Data Mode

The app includes mock data for development and testing:

- Set `USE_MOCK_DATA: true` in `src/config/api.js`
- Includes 5 popular movies with complete data
- Simulates API delays for realistic testing

### Adding New Features

1. **New Components**: Add to `src/components/`
2. **New Pages**: Add to `src/pages/` and update routing in `App.jsx`
3. **API Services**: Extend `src/services/tmdbApi.js`
4. **Styling**: Use Tailwind classes and shadcn/ui components

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Deploy to Netlify

1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure environment variables in Netlify settings
