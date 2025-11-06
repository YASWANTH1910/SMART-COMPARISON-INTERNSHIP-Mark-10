import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductList from "./productList";
import CategoryFilterMenu from "./categorymenu";
import "./ProductsPage.css";

const AllProductsPage = ({
  products,
  filteredProducts,
  setFilteredProducts,
  currentFilter,
  setCurrentFilter,
  onSpecClick,
  selectedProducts,
}) => {
  const location = useLocation();

  // Handle category icon click from home
  useEffect(() => {
    if (location.state?.filterCategory) {
      const cat = location.state.filterCategory;
      const newFilter = { mainItems: cat, subItems: "All" };
      setCurrentFilter(newFilter);

      const result = products.filter(p => p.category === cat);
      setFilteredProducts(result);
    }
  }, [location.state, products, setFilteredProducts, setCurrentFilter]);

  const applyFilter = (main, sub) => {
    setCurrentFilter({ mainItems: main, subItems: sub });

    if (main === "All") {
      setFilteredProducts(products);
    } else {
      const result = products.filter(p =>
        p.category === main && (sub === "All" || p.subcategory === sub)
      );
      setFilteredProducts(result);
    }
  };

  return (
    <div className="all-products-wrapper">
      <div className="page-title-box">
        <h2 className="page-main-title">Explore All Products</h2>
        <p className="page-subtitle">Find, filter, and compare everything in one place</p>
      </div>

      <div className="filter-section">
        <CategoryFilterMenu onCategorySelect={applyFilter} />
      </div>

      <div className="products-display-area">
        <ProductList
          products={filteredProducts}
          currentFilter={currentFilter}
          onSpecClick={onSpecClick}
          selectedProducts={selectedProducts}
        />
      </div>
    </div>
  );
};

export default AllProductsPage;