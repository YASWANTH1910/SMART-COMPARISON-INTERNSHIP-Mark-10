import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/navBar";
import ComparisonPage from "./components/comparisonPage";
import Login from "./components/login";
import TopProducts from "./components/topProducts";
import CategoryAndBrandShowcase from "./components/CategoryAndBrandShowcase";
import StoreBar from "./components/storeBar";
import AllProductsPage from "./components/ProductsPage";
import ProductGrid from "./components/productgrid"; 
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [currentFilter, setCurrentFilter] = useState({
    mainItems: "All",
    subItems: "All",
  });

  const navigate = useNavigate();
  const location = useLocation();

  // Load products.json
  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        const flattened = [];
        for (const cat in data) {
          for (const sub in data[cat]) {
            data[cat][sub].forEach((item) => {
              flattened.push({
                ...item,
                category: cat,
                subcategory: sub,
              });
            });
          }
        }

        setProducts(flattened);
        setFilteredProducts(flattened);
      })
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  // Reset compare when going home
  useEffect(() => {
    if (location.pathname === "/") setSelectedProducts([]);
  }, [location]);

  // Restore login state
  useEffect(() => {
    const state = localStorage.getItem("isLoggedIn");
    if (state === "true") setIsLoggedIn(true);
  }, []);

  // Navigation from Navbar category dropdown
  const handleCategorySelect = (cat, sub) => {
    if (cat === "All") {
      setFilteredProducts(products);
      setCurrentFilter({ mainItems: "All", subItems: "All" });
      return;
    }

    const filtered = products.filter(
      (p) =>
        p.category.toLowerCase() === cat.toLowerCase() &&
        (sub === "All" || p.subcategory.toLowerCase() === sub.toLowerCase())
    );

    setFilteredProducts(filtered);
    setCurrentFilter({ mainItems: cat, subItems: sub });
  };

  // Compare toggle
  const handleCompareToggle = (product) => {
    setSelectedProducts((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }

      if (prev.length >= 4) {
        alert("You can compare up to 4 items.");
        return prev;
      }

      return [...prev, product];
    });
  };

  const handleIconClick = (categoryName) => {
    navigate("/products", { state: { filterCategory: categoryName } });
  };

  const handleBrandClick = (brandName) => {
    navigate("/products", { state: { filterBrand: brandName } });
  };

  return (
    <div className="Appjsx">
      <header className="appjsx-header">
        <Navbar
          onCategorySelect={handleCategorySelect}
          compareCount={selectedProducts.length}
          selectedProducts={selectedProducts}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      </header>

      <main className="appjsx-main">
        <Routes>
          {/* HOME PAGE */}
          <Route
            path="/"
            element={
              <>
                <StoreBar />
                <TopProducts />

                <CategoryAndBrandShowcase
                  onBrandClick={handleBrandClick}
                  onCategoryClick={handleIconClick}
                  onViewAll={() => navigate("/products")}
                />

                <ProductGrid
                  title="Trending Products"
                  products={products.slice(0, 8)}
                  onSpecClick={handleCompareToggle}
                  selectedProducts={selectedProducts}
                />
              </>
            }
          />

          {/* ALL PRODUCTS PAGE */}
          <Route
            path="/products"
            element={
              <AllProductsPage
                products={products}
                filteredProducts={filteredProducts}
                setFilteredProducts={setFilteredProducts}
                currentFilter={currentFilter}
                setCurrentFilter={setCurrentFilter}
                onSpecClick={handleCompareToggle}
                selectedProducts={selectedProducts}
              />
            }
          />

          {/* COMPARE PAGE */}
          <Route
            path="/compare"
            element={<ComparisonPage selectedProducts={selectedProducts} />}
          />

          {/* LOGIN */}
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
      </main>

      <footer className="appjsx-footer">
        <p>© 2024 Smart Comparison. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
