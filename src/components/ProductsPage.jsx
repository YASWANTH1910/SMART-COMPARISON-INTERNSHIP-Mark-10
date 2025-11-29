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

  //
  // APPLY FILTERS WHEN NAVIGATED FROM CATEGORY MENU
  //
  useEffect(() => {
    if (location.state?.filterCategory || location.state?.filterSubcategory) {
      const main = location.state.filterCategory ?? "All";
      const sub = location.state.filterSubcategory ?? "All";

      setCurrentFilter({ mainItems: main, subItems: sub });

      let result = products;

      if (main !== "All") {
        result = result.filter((p) => p.category === main);
      }
      if (sub !== "All") {
        result = result.filter((p) => p.subcategory === sub);
      }

      setFilteredProducts(result);
    }
  }, [location.state, products, setFilteredProducts, setCurrentFilter]);

  return (
    <div className="all-products-wrapper">
      <div className="page-title-box">
        <h2 className="page-main-title">Explore All Products</h2>
      </div>

      <div className="filter-section">
        <div className="filters-and-list">

          {/* LEFT FILTER PANEL */}
          <div className="filters-sidebar">
            <ProductFilters
              products={products}
              currentFilter={currentFilter}
              onApplyFilters={(filters) => {
                let filtered = products;

                if (filters.category !== "All") {
                  filtered = filtered.filter((p) => p.category === filters.category);
                }
                if (filters.subcategory !== "All") {
                  filtered = filtered.filter((p) => p.subcategory === filters.subcategory);
                }
                if (filters.brands.length > 0) {
                  filtered = filtered.filter((p) =>
                    filters.brands.includes(p.features.Brand)
                  );
                }

                filtered = filtered.filter(
                  (p) => p.price <= filters.priceRange[1]
                );

                if (filters.minRating > 0) {
                  filtered = filtered.filter(
                    (p) => p.rating >= filters.minRating
                  );
                }

                // Sorting
                if (filters.sortOrder === "low-to-high") {
                  filtered = [...filtered].sort((a, b) => a.price - b.price);
                } else if (filters.sortOrder === "high-to-low") {
                  filtered = [...filtered].sort((a, b) => b.price - a.price);
                }
                setFilteredProducts(filtered);

                setCurrentFilter({
                  mainItems: filters.category,
                  subItems: filters.subcategory,
                });
              }}
              onClearFilters={() => {
                setFilteredProducts(products);
                setCurrentFilter({ mainItems: "All", subItems: "All" });
              }}
            />
          </div>

          {/* RIGHT PRODUCT LIST */}
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
};

export default AllProductsPage;
