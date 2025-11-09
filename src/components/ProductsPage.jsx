import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductList from "./productList";
import ProductFilters from "./ProductPageFilter";
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
      </div>

     <div className="filter-section">
  <div className="filters-and-list">
    <div className="filters-sidebar">
      <ProductFilters
        products={products}
        currentFilter={currentFilter}
        onApplyFilters={(filters) => {
          let filtered = products;

          if (filters.category !== "All") {
            filtered = filtered.filter(p => p.category === filters.category);
          }
          if (filters.subcategory !== "All") {
            filtered = filtered.filter(p => p.subcategory === filters.subcategory);
          }
          if (filters.brands.length > 0) {
            filtered = filtered.filter(p => filters.brands.includes(p.features.Brand));
          }
          filtered = filtered.filter(p => p.price <= filters.priceRange[1]);
          if (filters.minRating > 0) {
            filtered = filtered.filter(p => p.rating >= filters.minRating);
          }

          setFilteredProducts(filtered);
          setCurrentFilter({
            mainItems: filters.category,
            subItems: filters.subcategory
          });
        }}
        onClearFilters={() => {
          setFilteredProducts(products);
          setCurrentFilter({ mainItems: "All", subItems: "All" });
        }}
      />
    </div>

    <div className="products-list-area">
      <ProductList
        products={filteredProducts}
        currentFilter={currentFilter}
        onSpecClick={onSpecClick}
        selectedProducts={selectedProducts}
      />
    </div>
  </div>
</div>
    </div>
  );
}


export default AllProductsPage;