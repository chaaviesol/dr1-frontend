import React from 'react';
import './searchbar.css';

const SearchBar = ({handleProductSearch}) => {
  return (
    <div className="search-bar">
      <input onChange={handleProductSearch} type="text" placeholder="Search Product" className="search-input" />
      <i className="ri-search-line"></i>
    </div>
  );
};

export default SearchBar;