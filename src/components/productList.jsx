import React from "react";
import "./productList.css";

const ProductList = ({
  products = [],
  onSpecClick = () => {},
  selectedProducts = [],
}) => {
  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="list-empty">
        <p>No products found.</p>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      {products.map((product, index) => {
        const isSelected = selectedProducts.some((p) => p.id === product.id);
        // Brand (used for display and also ensures we don't have an "assigned but unused" variable)
        const brand = product?.features?.Brand || product?.brand || "Unknown";

        // Safe numeric price and original price fallback
        const price = Number(product?.price) || 0;
        const originalPrice = product?.originalPrice
          ? Number(product.originalPrice)
          : Math.round(price * 1.25);
        const discount =
          originalPrice > 0 ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

        // Compose a small spec string (if features exist)
        const specs = [
          product?.features?.Display,
          product?.features?.Processor,
          product?.features?.RAM,
        ]
          .filter(Boolean)
          .join(" | ");

        const handleCompareClick = (e) => {
          e.stopPropagation();
          // notify parent
          onSpecClick(product);
        };

        return (
          <div
            key={product.id || index}
            className="list-row"
            title="Click the Compare button to add/remove from comparison"
          >
            {/* LEFT: Image */}
            <div className="list-image">
              {product?.image ? (
                <img src={product.image} alt={product.name} loading="lazy" />
              ) : (
                <div className="no-img">No Image</div>
              )}
            </div>

            {/* CENTER: Name + Brand + Specs */}
            <div className="list-center">
              <div className="list-name">{product.name}</div>
              <div className="list-brand">{brand}</div>
              <div className="list-specs">{specs}</div>
            </div>

            {/* RIGHT: Rating + Price + Selector */}
            <div className="list-right">
              <div className="list-rating">
                {product?.rating ? `${product.rating}★` : "No Rating"}
              </div>

              <div className="list-price">
                <span className="current">
                  {price > 0 ? `₹${price.toLocaleString()}` : "N/A"}
                </span>

                {discount > 0 && originalPrice > 0 && (
                  <>
                    <span className="original">₹{originalPrice.toLocaleString()}</span>
                    <span className="discount">-{discount}%</span>
                  </>
                )}
              </div>

              {/* Compare Button */}
              <button
                className={`compare-btn ${isSelected ? "selected" : ""}`}
                onClick={handleCompareClick}
              >
                {isSelected ? "Remove" : "Compare"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
