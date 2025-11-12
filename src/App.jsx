import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import ProductList from "./components/productList";
import Navbar from "./components/navBar";
import ComparisonPage from "./components/comparisonPage";
import Login from "./components/login";
import TopProducts from "./components/topProducts";
import CategoryAndBrandShowcase from "./components/CategoryAndBrandShowcase";
import StoreBar from "./components/storeBar";
import "./App.css";
import AllProductsPage from "./components/ProductsPage";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentFilter, setCurrentFilter] = useState({
    mainItems: "All",
    subItems: "All",
  });

  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Load products
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

  // ✅ Clear compare selection when navigating home
  useEffect(() => {
    if (location.pathname === "/") {
      setSelectedProducts([]);
    }
  }, [location]);

  // ✅ Restore login state
  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    if (storedLogin === "true") setIsLoggedIn(true);
  }, []);

  // ✅ Category select from Navbar or elsewhere
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

  // ✅ Add/remove compare products
  const handleCompareToggle = (product) => {
    setSelectedProducts((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) return prev.filter((p) => p.id !== product.id);
      if (prev.length >= 4) {
        alert("You can compare up to 4 products only!");
        return prev;
      }
      return [...prev, product];
    });
  };

  // ✅ Top icon categories
  const iconCategories = [
    { name: "Mobiles", img: "https://cdn1.smartprix.com/rx-iViQd4cI8-w100-h100/ViQd4cI8.webp" },
    { name: "Laptops", img: "https://cdn1.smartprix.com/rx-i6invpMY2-w100-h100/6invpMY2.webp" },
    { name: "TVs", img: "https://cdn1.smartprix.com/rx-idTmyxzGZ-w100-h100/dTmyxzGZ.webp" },
    { name: "Tablets", img: "https://cdn1.smartprix.com/rx-iG5DXN6vc-w100-h100/G5DXN6vc.webp" },
    { name: "Cameras", img: "https://cdn1.smartprix.com/rx-iR6SKymCH-w100-h100/R6SKymCH.webp" },
    { name: "Earphones", img: "https://cdn1.smartprix.com/rx-iUfE0ayqy-w100-h100/UfE0ayqy.webp" },
    { name: "Smartwatch", img: "https://cdn1.smartprix.com/rx-iXjxQXvn2-w100-h100/XjxQXvn2.webp" },
  ];

  // ✅ Navigate when clicking category icon
  const handleIconClick = (categoryName) => {
    navigate("/products", { state: { filterCategory: categoryName } });
  };

  // ✅ Navigate when clicking brand (from showcase)
  const handleBrandClick = (brandName) => {
    navigate("/products", { state: { filterBrand: brandName } });
  };

  // ✅ Navigate when clicking category (from showcase)
  const handleCategoryClick = (categoryName) => {
    navigate("/products", { state: { filterCategory: categoryName } });
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
          {/* ✅ Home Page */}
          <Route
            path="/"
            element={
              <>
                <StoreBar />
                <TopProducts />
                <div className="category-wrapper">
                  <div className="category-menu">
                    {iconCategories.map((cat, i) => (
                      <div
                        key={i}
                        className="category-item"
                        onClick={() => handleIconClick(cat.name)}
                      >
                        <img src={cat.img} alt={cat.name} />
                        <p>{cat.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ✅ Showcase now supports both category + brand clicks */}
                <CategoryAndBrandShowcase
                  onCategoryClick={handleCategoryClick}
                  onBrandClick={handleBrandClick}
                />

                <div className="productlist-box">
                  <ProductList
                    products={filteredProducts}
                    currentFilter={currentFilter}
                    onSpecClick={handleCompareToggle}
                    selectedProducts={selectedProducts}
                  />
                </div>
              </>
            }
          />

          {/* ✅ Product Page */}
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

          {/* ✅ Comparison Page */}
          <Route
            path="/compare"
            element={<ComparisonPage selectedProducts={selectedProducts} />}
          />

          {/* ✅ Login Page */}
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
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
