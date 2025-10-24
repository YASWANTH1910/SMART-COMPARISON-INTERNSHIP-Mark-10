import React, { useState, useEffect } from "react";
import "./searchBar.css";
console.log("✅ SearchBar component loaded!");

const PRODUCTS = [
  { id: 1, name: "iPhone 14", category: "Electronics" },
  { id: 2, name: "MacBook Pro", category: "Electronics" },
  { id: 3, name: "Wireless Headphones", category: "Electronics" },
  { id: 4, name: "Men T-Shirt", category: "Fashion" },
  { id: 5, name: "Running Shoes", category: "Fashion" },
  { id: 6, name: "Coffee Maker", category: "Home" },
];

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (query.length > 1) {
      const filtered = PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSelect = (item) => {
    alert(`Selected: ${item.name}`);
    setQuery("");
    setSuggestions([]);
  };
  console.log("Rendering JSX for SearchBar...");


  return (
    <div className="searchbar-container">
      <input
        type="text"
        placeholder="🔍 Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="searchbar-input"
      />

      {suggestions.length > 0 && (
       <div className="sug-main"> <ul className="suggestion-box">
          {suggestions.map((item) => (
           <h4
              key={item.id}
              onClick={() => handleSelect(item)}
              className="suggestion-item"
            >
             {item.name}
          
             </h4>
          ))}
       </ul>
       </div>
      )}
          
       
      
    </div>
  );
};

export default SearchBar;
