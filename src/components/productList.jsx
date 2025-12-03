import React from "react";
import WishlistButton from "./WishlistButton";
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

        const brand =
          product?.features?.Brand || product?.brand || "Unknown";

        const price = Number(product?.price) || 0;

        const originalPrice = product?.originalPrice
          ? Number(product.originalPrice)
          : Math.round(price * 1.25);

        const discount =
          originalPrice > 0
            ? Math.round(((originalPrice - price) / originalPrice) * 100)
            : 0;

        const specs = [
          product?.features?.Display,
          product?.features?.Processor,
          product?.features?.RAM,
        ]
          .filter(Boolean)
          .join(" | ");

        const handleCompareClick = (e) => {
          e.stopPropagation();
          onSpecClick(product);
        };

        return (
          <div
            key={product.id || index}
            className="list-row"
            title="Click Compare to add/remove"
          >
            {/* Wishlist button overlay in top-right */}
            <WishlistButton productId={product.id} small={true} />
            {/* LEFT: IMAGE */}
            <div className="list-image">
              {product?.image ? (
                <img src={product.image} alt={product.name} loading="lazy" />
              ) : (
                <div className="no-img">No Image</div>
              )}
            </div>

            {/* CENTER: TEXT DETAILS */}
            <div className="list-center">
              <div className="list-name">{product.name}</div>
              <div className="list-brand">{brand}</div>
              <div className="list-specs">{specs}</div>
            </div>

            {/* RIGHT: PRICE + BUTTON */}
            <div className="list-right">
              <div className="list-rating">
                {product?.rating ? `${product.rating}★` : "No Rating"}
              </div>

              <div className="list-price">
                <span className="current">
                  {price ? `₹${price.toLocaleString()}` : "N/A"}
                </span>

                {discount > 0 && (
                  <>
                    <span className="original">
                      ₹{originalPrice.toLocaleString()}
                    </span>
                    <span className="discount">-{discount}%</span>
                  </>
                )}
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  className={`compare-btn ${isSelected ? "selected" : ""}`}
                  onClick={handleCompareClick}
                >
                  {isSelected ? "Remove" : "Compare"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;