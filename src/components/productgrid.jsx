// src/components/productgrid.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
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
    navigate("/products", {
      state: { scrollTo: product.id }
    });
  };

  const handleCompareClick = (e, product) => {
    e.stopPropagation();

    if (typeof onSpecClick === "function") {
      onSpecClick(product);
      return;
    }

    // DO NOTHING when parent doesn’t send handler
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
              <div className="pgx-rating">
                {Array.from({
                  length: Math.round(product.rating || 0),
                }).map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
            </div>

            <button
              type="button"
              className={`pgx-compare ${isCompared(product.id) ? "selected" : ""}`}
              onClick={(e) => handleCompareClick(e, product)}
            >
              {isCompared(product.id) ? "Remove" : "Compare"}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
