import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import WishlistButton from "./BookmarkButton";
import useLocalStorage from "../hooks/useLocalStorage";
import "./ProductDetailsPage.css";

export default function ProductDetailsPage({ products = [], onSpecClick = () => {} }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookmark, setBookmark] = useLocalStorage("Bookmark", []);
  // const longPressTimer = useRef(null);
  const [swipeMessage, setSwipeMessage] = useState("");

  useEffect(() => {
    const found = products.find((p) => String(p.id) === String(productId));
    setProduct(found);
    setLoading(false);
  }, [productId, products]);

  if (loading) {
    return <div className="pdp-loading">Loading product details...</div>;
  }

  if (!product) {
    return (
      <div className="pdp-not-found">
        <h2>Product not found</h2>
        <button onClick={() => navigate("/products")} className="pdp-back-btn">
          Back to Products
        </button>
      </div>
    );
  }

  const brand = product.features?.Brand || product.brand || "Unknown";
  const originalPrice = product.originalPrice
    ? Number(product.originalPrice)
    : Math.round(product.price * 1.25);
  const discount =
    originalPrice > 0
      ? Math.round(((originalPrice - product.price) / originalPrice) * 100)
      : 0;

  return (
    <div className="pdp-container">
      {/* Back button */}
      <button onClick={() => navigate(-1)} className="pdp-back-btn">
        ← Back
      </button>

      {/* Main content */}
      <div className="pdp-content">
        {/* Left: Image */}
        <div className="pdp-image-section">
          <div className="pdp-image-wrapper">
            <img
              src={product.image}
              alt={product.name}
              className="pdp-image"
              onError={(ev) => {
                ev.currentTarget.src =
                  "https://via.placeholder.com/500x500?text=No+Image";
              }}
            />
            {/* Wishlist button overlay */}
            <div className="pdp-wishlist-overlay">
              <WishlistButton productId={product.id} small={false} />
            </div>
          </div>
        </div>

        {/* Right: Details */}
        <div className="pdp-details-section">
          {/* Header: Name, Brand, Rating */}
          <div className="pdp-header">
            <h1 className="pdp-name">{product.name}</h1>
            <p className="pdp-brand">Brand: {brand}</p>
            <div className="pdp-rating">
              {product.rating?.toFixed(1)}★ Rating
            </div>
          </div>

          {/* Price Section */}
          <div className="pdp-price-section">
            <div className="pdp-price-current">₹{product.price?.toLocaleString()}</div>
            {originalPrice > product.price && (
              <>
                <div className="pdp-price-original">₹{originalPrice.toLocaleString()}</div>
                <div className="pdp-price-discount">-{discount}% off</div>
              </>
            )}
          </div>

          {/* Specifications */}
          <div className="pdp-specs-section">
            <h3 className="pdp-specs-title">Specifications</h3>
            <div className="pdp-specs-grid">
              {product.features && Object.entries(product.features).map(([key, value]) => (
                <div key={key} className="pdp-spec-item">
                  <div className="pdp-spec-label">{key}</div>
                  <div className="pdp-spec-value">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Big Add to Bookmarks button */}
          <div className="pdp-actions">
            <button
              type="button"
              className="pdp-bookmark-btn"
              onClick={() => {
                const pid = String(product.id);
                const bookmarkStr = (bookmark || []).map((id) => String(id));
                if (bookmarkStr.includes(pid)) {
                  setBookmark((bookmark || []).filter((id) => String(id) !== pid));
                  setSwipeMessage("Removed from bookmarks");
                } else {
                  setBookmark([...(bookmark || []), pid]);
                  setSwipeMessage("Added to bookmarks");
                }
                setTimeout(() => setSwipeMessage(""), 1200);
              }}
            >
              { (bookmark || []).map(String).includes(String(product.id)) ? 'Bookmarked' : 'Add to Bookmarks' }
            </button>
            {swipeMessage && <div className="pdp-swipe-feedback">{swipeMessage}</div>}
          </div>

          {/* Additional Info */}
          <div className="pdp-info">
            <p>✓ Free Shipping on orders above ₹500</p>
            <p>✓ 30-day return policy</p>
            <p>✓ 1-year manufacturer warranty on electronics</p>
          </div>
        </div>
      </div>
    </div>
  );
}
