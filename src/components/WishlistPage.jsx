import React from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import ProductGrid from "./productgrid";
import "./WishlistPage.css";

export default function WishlistPage({ products = [], onSpecClick, selectedProducts = [] }) {
  const [wishlist = []] = useLocalStorage("wishlist", []);
  const navigate = useNavigate();

  // normalize: product ids in wishlist may be strings or numbers
  const wishlistSet = new Set((wishlist || []).map((id) => String(id)));

  const wishlistProducts = (products || []).filter((p) => wishlistSet.has(String(p.id)));

  return (
    <div className="wishlist-container">
      <main className="wishlist-main">
        <div className="wishlist-header">
          <h2>My Wishlist</h2>
          {wishlistProducts.length > 0 && (
            <p className="wishlist-count">{wishlistProducts.length} items in wishlist</p>
          )}
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="wishlist-empty">
            <div className="wishlist-empty-icon">💔</div>
            <p>Your wishlist is empty.</p>
            <p style={{ fontSize: 14, color: "#999", margin: 0 }}>Add items to your wishlist to compare them later.</p>
            <button 
              className="wishlist-empty-link"
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <ProductGrid
            title="Wishlist"
            products={wishlistProducts}
            onSpecClick={onSpecClick}
            selectedProducts={selectedProducts}
          />
        )}
      </main>
    </div>
  );
}