import React, { useState } from 'react';
import './FloodMap.css';
import { useSearch } from '../../../context/SearchContext';

const SearchMap = () => {
  const { handleSearch } = useSearch(); 
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) { 
      handleSearch(query.trim());
      setQuery(''); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter a location"
        className="search-input"
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
};

export default SearchMap;
