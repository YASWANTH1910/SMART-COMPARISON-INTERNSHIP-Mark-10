import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import "./BookmarkButton.css";

// Props: productId (string), small (boolean)
export default function BookmarkButton({ productId, small = false }) {
  const [Bookmark = [], setBookmark] = useLocalStorage("Bookmark", []);

  const isSaved = Bookmark.includes(productId);

  function toggle(e) {
    e.stopPropagation();
    let next;
    if (isSaved) {
      next = Bookmark.filter((id) => id !== productId);
    } else {
      next = [...Bookmark, productId];
    }
    setBookmark(next);
  }

  return (
    <button
      className={"Bookmark-btn" + (isSaved ? " active" : "") + (small ? " small" : "")}
      onClick={toggle}
      aria-pressed={isSaved}
      aria-label={isSaved ? "Remove from Bookmark" : "Add to Bookmark"}
      title={isSaved ? "Remove from Bookmark" : "Add to Bookmark"}
    >
      <svg viewBox="0 0 24 24" className="heart-icon" aria-hidden="true">
        <path d="M12 21s-7.5-4.5-9.5-7.5C-0.5 8.5 4 3 8.5 5.5 10.3 6.6 12 8.2 12 8.2s1.7-1.6 3.5-2.7C20 3 24.5 8.5 21.5 13.5 19.5 16.5 12 21 12 21z" />
      </svg>
    </button>
  );
}