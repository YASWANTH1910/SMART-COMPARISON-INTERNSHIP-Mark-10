import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import "./BookmarkButton.css";

// Props: productId (string|number), small (boolean)
export default function BookmarkButton({ productId, small = false }) {
  const [Bookmark = [], setBookmark] = useLocalStorage("Bookmark", []);

  // normalize stored ids to strings for consistent comparison
  const bookmarkStr = (Bookmark || []).map((id) => String(id));
  const pid = String(productId);
  const isSaved = bookmarkStr.includes(pid);

  function toggle(e) {
    e.stopPropagation();
    let next;
    if (isSaved) {
      next = (Bookmark || []).filter((id) => String(id) !== pid);
    } else {
      next = [...(Bookmark || []), pid];
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
  <svg viewBox="0 0 24 24" className="bookmark-icon" aria-hidden="true">
    {isSaved ? (
      <path d="M6 2h12a2 2 0 0 1 2 2v18l-8-4-8 4V4a2 2 0 0 1 2-2z" />
    ) : (
      <path d="M6 4v15.17l6-3 6 3V4H6m0-2h12a2 2 0 0 1 2 2v18l-8-4-8 4V4a2 2 0 0 1 2-2z" />
    )}
  </svg>
  </button>
  );
}