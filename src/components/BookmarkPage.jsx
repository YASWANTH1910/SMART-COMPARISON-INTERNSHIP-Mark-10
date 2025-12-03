import React from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import ProductGrid from "./productgrid";
import "./BookmarkPage.css";

export default function BookmarkPage({ products = [], onSpecClick, selectedProducts = [] }) {
  const [Bookmark = []] = useLocalStorage("Bookmark", []);
  const navigate = useNavigate();

  // normalize: product ids in Bookmark may be strings or numbers
  const BookmarkSet = new Set((Bookmark || []).map((id) => String(id)));

  const BookmarkProducts = (products || []).filter((p) => BookmarkSet.has(String(p.id)));

  return (
    <div className="Bookmark-container">
      <main className="Bookmark-main">
        <div className="Bookmark-header">
          <h2>My Bookmark</h2>
          {BookmarkProducts.length > 0 && (
            <p className="Bookmark-count">{BookmarkProducts.length} items in Bookmark</p>
          )}
        </div>

        {BookmarkProducts.length === 0 ? (
          <div className="Bookmark-empty">
            <div className="Bookmark-empty-icon">💔</div>
            <p>Your Bookmark is empty.</p>
            <p style={{ fontSize: 14, color: "#999", margin: 0 }}>Add items to your Bookmark to compare them later.</p>
            <button 
              className="Bookmark-empty-link"
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <ProductGrid
            title="Bookmark"
            products={BookmarkProducts}
            onSpecClick={onSpecClick}
            selectedProducts={selectedProducts}
          />
        )}
      </main>
    </div>
  );
}