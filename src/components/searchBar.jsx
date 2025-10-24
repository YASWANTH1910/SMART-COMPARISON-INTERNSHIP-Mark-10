import React, { useState, useEffect } from "react";
import "./searchBar.css";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  //  Fetch data from products.json
  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        // Extract all product items from nested categories
        const extractedProducts = [];
        Object.keys(data).forEach((category) => {
          Object.keys(data[category]).forEach((subcat) => {
            data[category][subcat].forEach((item) => extractedProducts.push(item));
          });
        });
        setAllProducts(extractedProducts);
      })
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  // Filter suggestions based on user input
  useEffect(() => {
    if (query.length > 1) {
      const filtered = allProducts.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, [query, allProducts]);

  const handleSelect = (item) => {
    alert(`Selected: ${item.name}`);
    setQuery("");
    setSuggestions([]);
  };

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
