import React from 'react';

function SearchBar() {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search by Category, Company or..." />
      <button type="submit">Search</button>
    </div>
  );
}

export default SearchBar;
