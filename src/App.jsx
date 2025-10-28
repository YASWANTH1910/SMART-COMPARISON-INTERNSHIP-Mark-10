import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ProductList from "./components/productList";
import Navbar from "./components/navBar";
import ComparisonPage from "./components/comparisonPage";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]); // ✅ uncommented & added
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
        setProducts(flattened);
        setFilteredProducts(flattened);
      })
      .catch((err) => console.error("Error loading product data:", err));
  }, []);
    const location = useLocation();

  // ✅ Reset compare selections when user returns to home
  useEffect(() => {
    if (location.pathname === "/") {
      setSelectedProducts([]); // clear selections
    }
  }, [location]);


  // ✅ Category filter handler
  const handleCategorySelect = (mainItems, subItems) => {
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

  // ✅ Compare toggle handler
  const handleCompareToggle = (product) => {
    setSelectedProducts((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 3) {
        alert("You can compare up to 3 products only!");
        return prev;
      }
      return [...prev, product];
    });
  };

  return (
    <div className="Appjsx">
      <header className="appjsx-header">
        <Navbar
          onCategorySelect={handleCategorySelect}
          compareCount={selectedProducts.length} // ✅ show compare count
          selectedProducts={selectedProducts} // ✅ pass selected products
        />
      </header>

      <main className="appjsx-main">
        <Routes>
          <Route
            path="/"
            element={
              <div className="productlist-box">
                <ProductList
                  products={filteredProducts}
                  currentFilter={currentFilter}
                  onSpecClick={handleCompareToggle} // ✅ toggle selection
                  selectedProducts={selectedProducts} // ✅ track selection
                />
              </div>
            }
          />

          {/* ✅ Compare page route */}
          <Route
            path="/compare"
            element={<ComparisonPage selectedProducts={selectedProducts} />}
          />
        </Routes>
      </main>

      <footer className="appjsx-footer">
        <p>© 2024 Smart Comparison. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
