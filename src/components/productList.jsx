import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./productList.css";

const ProductList = ({ products, currentFilter }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigate = useNavigate(); 

  // Handles selection toggle
  const handleCompareSelect = (product) => {
    const alreadySelected = selectedProducts.find((p) => p.id === product.id);
    if (alreadySelected) {
      // Remove if already selected
      setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));
    } else if (selectedProducts.length < 3) {
      // Limit to 3 items for clarity
      setSelectedProducts([...selectedProducts, product]);
    } else {
      alert("You can compare up to 3 products only!");
    }
  };

  // ✅ Navigate to Comparison Page
  const openComparison = () => {
    if (selectedProducts.length < 2) {
      alert("Select at least 2 products to compare!");
      return;
    }

    // Send the selected products to the comparison page
    navigate("/compare", { state: { selectedProducts } });
  };

  return (
    <div className="product-list">
      <h2>All Products</h2>

      {/* ✅ Product cards grid */}
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            {/* Product Image */}
            <div className="product-image-container">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                  loading="lazy"
                />
              ) : (
                <div className="no-image">No Image</div>
              )}
            </div>

            {/* Product Info */}
            <h3>{product.name}</h3>
            <p className="description">{product.description}</p>
            <p>⭐ {product.rating}</p>
            <p className="price">₹{product.price}</p>

            {/* ✅ Compare button */}
            <button
              onClick={() => handleCompareSelect(product)}
              className={`compare-btn ${
                selectedProducts.find((p) => p.id === product.id)
                  ? "selected"
                  : ""
              }`}
            >
              {selectedProducts.find((p) => p.id === product.id)
                ? "✓ Selected"
                : "Compare"}
            </button>
          </div>
        ))}
      </div>

      {/* ✅ Compare Now button */}
      {selectedProducts.length > 1 && (
        <button className="compare-now-btn" onClick={openComparison}>
          Compare Now ({selectedProducts.length})
        </button>
      )}
    </div>
  );
};

export default ProductList;
