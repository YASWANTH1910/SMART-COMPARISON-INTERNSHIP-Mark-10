import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./components/productList";
import Navbar from "./components/navBar";
import ComparisonPage from "./components/comparisonPage";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currentFilter, setCurrentFilter] = useState({
    mainItems: "All",
    subItems: "All",
  });

  // ✅ Load product data
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

  // ✅ Category filter
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

  return (
    <Router>
      <Navbar
        compareCount={selectedProducts.length}
        onCategorySelect={handleCategorySelect}
        selectedProducts={selectedProducts}
      />

      <Routes>
        <Route
          path="/"
          element={
            <div className="Appjsx">
              <main className="appjsx-main">
                <div className="productlist-box">
                  <ProductList
                    products={filteredProducts}
                    currentFilter={currentFilter}
                    selectedProducts={selectedProducts}
                    setSelectedProducts={setSelectedProducts}
                  />
                </div>
              </main>

              <footer className="appjsx-footer">
                <p>© 2024 Smart Comparison. All rights reserved.</p>
              </footer>
            </div>
          }
        />

        <Route
          path="/compare"
          element={<ComparisonPage selectedProducts={selectedProducts} />}
        />
      </Routes>
    </Router>
  );
}

export default App;

