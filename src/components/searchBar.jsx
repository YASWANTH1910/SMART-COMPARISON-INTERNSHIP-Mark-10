import React, { useState, useEffect, useRef } from "react";
import "./searchBar.css";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const containerRef = useRef(null);

  // ✅ Load products from public/data/products.json
  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        const items = [];
        Object.keys(data || {}).forEach((category) => {
          Object.keys(data[category] || {}).forEach((subcat) => {
            (data[category][subcat] || []).forEach((item, index) => {
              items.push({
                id: item.id || `${category}-${subcat}-${index}`,
                name: item.name || item["Model Series Name"] || "Unnamed Product",
              });
            });
          });
        });
        setAllProducts(items);
      })
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  // ✅ Filter results
  useEffect(() => {
    if (query.length > 1) {
      const filtered = allProducts.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 6));
    } else {
      setSuggestions([]);
    }
  }, [query, allProducts]);

  // ✅ Handle select
  const handleSelect = (item) => {
    alert(`Selected: ${item.name}`);
    setQuery("");
    setSuggestions([]);
  };

  // ✅ Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="searchbar-container" ref={containerRef}>
      <input
        type="text"
        placeholder=" Search products                                                        🔍"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="searchbar-input"
        autoComplete="off"
      />

      {suggestions.length > 0 && (
        <ul className="suggestions-box">
          {suggestions.map((item) => (
            <li
              key={item.id}
              onMouseDown={() => handleSelect(item)} // works perfectly
              className="suggestion-item">
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
