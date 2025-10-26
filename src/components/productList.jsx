import React from "react";
import "./productList.css";

const ProductList = ({ products, currentFilter, selectedProducts, setSelectedProducts }) => {

  // Handles selection toggle
  const handleCompareSelect = (product) => {
    const alreadySelected = selectedProducts.find((p) => p.id === product.id);
    if (alreadySelected) {
      setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));
    } else if (selectedProducts.length < 3) {
      setSelectedProducts([...selectedProducts, product]);
    } else {
      alert("You can compare up to 3 products only!");
    }
  };

  return (
    <div className="product-list">
      <h2>All Products</h2>

      {/* Product cards grid */}
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

            {/* Compare button */}
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
    </div>
  );
};

export default ProductList;
