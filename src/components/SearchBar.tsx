// https://wenku.csdn.net/answer/c269a74c74f34899b606865cd3498f11?ydreferer=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8%3D

// https://plainenglish.io/blog/how-to-implement-a-search-bar-in-react-js

// https://github.com/TZawalich/React_Search_Components

import React from 'react';
import { Search } from 'react-bootstrap-icons';

const SearchBar = () => (
  <div className="search-wrapper">
    <button type="submit" className="search-button">
      <Search />
    </button>
    <input type="search" placeholder="Search..." className="search-input" />
  </div>
);

export default SearchBar;
