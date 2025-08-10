import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';

/**
 * SearchBar component for movie search functionality
 * @param {Object} props - Component props
 * @param {Function} props.onSearch - Callback function when search is performed
 * @param {boolean} props.isLoading - Loading state indicator
 * @param {string} props.placeholder - Placeholder text for input
 */
const SearchBar = ({ 
  onSearch, 
  isLoading = false, 
  placeholder = "Search for movies..." 
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    if (onSearch) {
      onSearch('');
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          {/* Search Icon */}
          <Search className="absolute left-3 h-5 w-5 text-muted-foreground" />
          
          {/* Search Input */}
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="w-full pl-10 pr-20 py-3 text-lg border border-border rounded-lg 
                     bg-background text-foreground placeholder:text-muted-foreground
                     focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
                     disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          />
          
          {/* Clear Button */}
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-16 p-1 text-muted-foreground hover:text-foreground
                       transition-colors duration-200"
              disabled={isLoading}
            >
              <X className="h-4 w-4" />
            </button>
          )}
          
          {/* Search Button */}
          <Button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="absolute right-2 px-3 py-1.5"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent" />
            ) : (
              'Search'
            )}
          </Button>
        </div>
      </form>
      
      {/* Search Tips */}
      <div className="mt-2 text-sm text-muted-foreground text-center">
        Try searching for movies like "The Dark Knight", "Inception", or "Pulp Fiction"
      </div>
    </div>
  );
};

export default SearchBar;

