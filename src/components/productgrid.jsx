
import React from "react";
import { useNavigate } from "react-router-dom";
import BookmarkButton from "./BookmarkButton";
import "./productgrid.css";

export default function ProductGrid({
  title = "Popular Products",
  products = [],
  onSpecClick,
  selectedProducts = [],
}) {
  const navigate = useNavigate();

  const isCompared = (id) =>
    (selectedProducts || []).some((p) => p.id === id);

  const handleCardClick = (product) => {
    // navigate to product details page for the clicked product
    navigate(`/product/${product.id}`);
  };

  const handleCompareClick = (e, product) => {
    e.stopPropagation();

    if (typeof onSpecClick === "function") {
      onSpecClick(product);
      return;
    }

    console.log("Compare clicked but no onSpecClick handler.");
  };

  return (
    <section className="pgx-container" aria-label={title}>
      <div className="pgx-header">
        <h2 className="pgx-title">{title}</h2>

        <button
          type="button"
          className="pgx-viewall"
          onClick={() => navigate("/products")}
        >
          View All →
        </button>
      </div>

      <div className="pgx-grid">
        {!products?.length && (
          <div className="pgx-empty">No products to show.</div>
        )}

        {products.map((product) => (
          <article
            key={product.id}
            className="pgx-card"
            onClick={() => handleCardClick(product)}
          >
            {/* Bookmark button placed as an overlay in the top-right */}
            <BookmarkButton productId={product.id} small={true} />

            <div className="pgx-imgwrap">
              <img
                src={product.image}
                alt={product.name}
                className="pgx-img"
                onError={(ev) => {
                  ev.currentTarget.src =
                    "https://via.placeholder.com/400x400?text=No+Image";
                }}
              />
            </div>

            <div className="pgx-meta">
              <div className="pgx-name">{product.name}</div>
              <div className="pgx-price">₹{product.price}</div>
              <div className="pgx-rating">{product.rating?.toFixed(1)}★</div>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button
                type="button"
                className={`pgx-compare ${isCompared(product.id) ? "selected" : ""}`}
                onClick={(e) => handleCompareClick(e, product)}>
                {isCompared(product.id) ? "Remove" : "Compare"}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
