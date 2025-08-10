import { Link, useLocation } from 'react-router-dom';
import { Home, Heart, Film } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext.jsx';

/**
 * Navigation component for app-wide navigation
 */
const Navigation = () => {
  const location = useLocation();
  const { getFavoritesCount } = useFavorites();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-xl font-bold text-foreground hover:text-primary transition-colors"
          >
            <Film className="h-6 w-6" />
            Movie Search
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${isActive('/') 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
            >
              <Home className="h-4 w-4" />
              Home
            </Link>

            <Link
              to="/favorites"
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors relative
                ${isActive('/favorites') 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
            >
              <Heart className="h-4 w-4" />
              Favorites
              {getFavoritesCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getFavoritesCount()}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

