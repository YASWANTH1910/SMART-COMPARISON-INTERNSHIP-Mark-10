import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import "./WishlistButton.css";

// Props: productId (string), small (boolean)
export default function WishlistButton({ productId, small = false }) {
  const [wishlist = [], setWishlist] = useLocalStorage("wishlist", []);

  // normalize IDs to strings to avoid type mismatches (number vs string)
  const wishlistStr = (wishlist || []).map((id) => String(id));
  const pid = String(productId);
  const isSaved = wishlistStr.includes(pid);

  function toggle(e) {
    e.stopPropagation();
    let next;
    if (isSaved) {
      next = (wishlist || []).filter((id) => String(id) !== pid);
    } else {
      next = [...(wishlist || []), pid];
    }
    setWishlist(next);
  }

  return (
    <button
      className={"wishlist-btn" + (isSaved ? " active" : "") + (small ? " small" : "")}
      onClick={toggle}
      aria-pressed={isSaved}
      aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
      title={isSaved ? "Remove from wishlist" : "Add to wishlist"}
    >
      <svg viewBox="0 0 24 24" className="heart-icon" role="img" aria-hidden="true" focusable="false">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </button>
  );
}