import React from "react";
import "./productList.css";

const ProductList = ({ products = [], onSpecClick = () => {}, selectedProducts = [] }) => {
  // safeguard: if products is not an array or empty, show friendly message
  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="product-list">
        <h2>All Products</h2>
        <p>No products available.</p>
      </div>
    );
  }

  // keep a single console sample for debugging (optional)
  console.log("Product sample:", products[0]);

  return (
    <div className="product-list">
      <h2>All Products</h2>

      {/* Product cards grid */}
      <div className="product-grid">
        {products.map((product) => {
          const isSelected = Array.isArray(selectedProducts) && selectedProducts.some((p) => p.id === product.id);

          return (
            <div
              key={product.id}
              className="product-card"
              onClick={() => {
                // clicking the card uses the same handler (optional). If you want card click to do something else,
                // change this in future. For now it toggles selection like the button.
                if (typeof onSpecClick === "function") onSpecClick(product);
              }}
            >
              {/* Product Image */}
              <div className="product-image-container">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name || "Product"}
                    className="product-image"
                    loading="lazy"
                  />
                ) : (
                  <div className="no-image">No Image</div>
                )}
              </div>

              {/* Product Info */}
              <h3>{String(product.name ?? "Unnamed Product")}</h3>
              <p className="description">{String(product.description ?? "No description")}</p>
              <p>⭐ {String(product.rating ?? "N/A")}</p>
              <p className="price">₹{String(product.price ?? "0")}</p>

              {/* Compare button */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // prevent triggering card click
                  if (typeof onSpecClick === "function") onSpecClick(product);
                }}
                className={`compare-btn ${isSelected ? "selected" : ""}`}
              >
                {isSelected ? "✓ Selected" : "Compare"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
