// src/components/ProductList.jsx
import React, { useState } from "react";
import "./productList.css";

const ProductList = ({ products = [], onSpecClick = () => {} }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="list-empty">
        <p>No products found.</p>
      </div>
    );
  }

  const toggleSelect = (product) => {
    setSelectedProducts(prev =>
      prev.some(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    );
  };

  return (
    <div className="product-list-container">
      {products.map((product) => {
        const isSelected = selectedProducts.some(p => p.id === product.id);
        const brand = product.features?.Brand || "Unknown";
        const originalPrice = Math.round(product.price * 1.25);
        const discount = Math.round(((originalPrice - product.price) / originalPrice) * 100);
        const specs = [
          product.features?.Display,
          product.features?.Processor,
          product.features?.RAM
        ].filter(Boolean).join(" | ");

        return (
          <div className="list-row"
          onClick={(e) => {
              e.stopPropagation();
              toggleSelect(product, onSpecClick(product));
            }}
            title="Click to select for comparison"
          >
            {/* LEFT: Image */}
            <div className="list-image">
              {product.image ? (
                <img src={product.image} alt={product.name} loading="lazy" />
              ) : (
                <div className="no-img">No Image</div>
              )}
            </div>

            {/* CENTER: Name + Specs */}
            <div className="list-center">
              <div className="list-name">{product.name}</div>
              <div className="list-specs">{specs}</div>
            </div>

            {/* RIGHT: Rating + Price + Selector */}
            <div className="list-right">
              <div className="list-rating">{product.rating}★</div>
              <div className="list-price">
                <span className="current">₹{product.price.toLocaleString()}</span>
                {discount > 0 && (
                  <>
                    <span className="original">₹{originalPrice.toLocaleString()}</span>
                    <span className="discount">-{discount}%</span>
                  </>
                )}
              </div>

              {/* Beautiful Selector (Visual Only) */}
              <div className={`selector ${isSelected ? "selected" : ""}`}>
                <div className="selector-dot"></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;