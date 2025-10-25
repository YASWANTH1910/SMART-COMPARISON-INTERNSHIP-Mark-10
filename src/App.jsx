import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
// import CategoryFilterMenu from "./components/categorymenu";
import ProductList from "./components/productList";
import Navbar from "./components/navBar";
import ComparisonPage from "./components/comparisonPage"; 
import "./App.css";

function App() {
  const [products, setProducts] = useState([]); // full data
  const [filteredProducts, setFilteredProducts] = useState([]); // filtered display
  const [currentFilter, setCurrentFilter] = useState({
    mainItems: "All",
    subItems: "All",
  });

  // ✅ Load data from public/data/products.json
  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        const flattened = [];
        for (const mainCat in data) {
          const subCats = data[mainCat];
          for (const subCat in subCats) {
            subCats[subCat].forEach((item) => {
              flattened.push({
                ...item,
                category: mainCat,
                subcategory: subCat,
              });
            });
          }
        }
        console.log("✅ Flattened Data:", flattened);
        setProducts(flattened);
        setFilteredProducts(flattened);
      })
      .catch((err) =>
        console.error("❌ Error loading product data:", err)
      );
  }, []);

  // ✅ Handle category filter
  const handleCategorySelect = (mainItems, subItems) => {
    console.log(`Selected Category: ${mainItems} - ${subItems}`);
    setCurrentFilter({ mainItems, subItems });

    if (mainItems === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (p) =>
          p.category === mainItems &&
          (subItems === "All" || p.subcategory === subItems)
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <Router>
      <Navbar />

      <Routes>
        {/* 🏠 Home Page */}
        <Route
          path="/"
          element={
            <div className="Appjsx">
              {/* <header className="appjsx-header">
                <CategoryFilterMenu onCategorySelect={handleCategorySelect} />
              </header> */}

              <main className="appjsx-main">
                <div className="productlist-box">
                  <ProductList
                    products={filteredProducts}
                    currentFilter={currentFilter}
                  />
                </div>
              </main>

              <footer className="appjsx-footer">
                <p>© 2024 Smart Comparison. All rights reserved.</p>
              </footer>
            </div>
          }
        />

        {/*Comparison Page */}
        <Route path="/compare" element={<ComparisonPage />} />
      </Routes>
    </Router>
  );
}

export default App;
