// components/CategoryAndBrandShowcase.jsx
import React from "react";
import "./showCase.css";

const CategoryAndBrandShowcase = ({ onCategoryClick, onBrandClick, onViewAll }) => {
  // Categories
  const categories = [
    {
      title: "Electronics",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShKzf_0i1gQzDbjW3vBHfSjO6L7oc4VhlwyQ&s",
      price: "Laptops from ₹49,999",
    },
    {
      title: "Furniture",
      image:
        "https://images.unsplash.com/photo-1616628188469-7d6a3a3d5f3f",
      price: "Couches from ₹9,999",
    },
    {
      title: "Fashion",
      image:
        "https://imgs.search.brave.com/kAcC_x0Wv-Ut6j7cAr53qXz-jg8s2qj_qJ6mc7ezyJU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjF6TVoxcXhSQUwu/anBn",
      price: "Clothing from ₹599",
    },
    {
      title: "Skincare & Beauty",
      image:
        "https://imgs.search.brave.com/AMYlcBUhlHwEvhHKm9GdNikNePF7rptr7QMuQdkJu_E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/MzFjK0RxTkh1OEwu/anBn",
      price: "Facewash from ₹399",
    },
  ];

  // Brands
  const brands = [
    {
      title: "Apple",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
      category: "Electronics",
    },
    {
      title: "IKEA",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/c/c5/Ikea_logo.svg",
      category: "Furniture",
    },
    {
      title: "ZARA",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg",
      category: "Fashion",
    },
    {
      title: "L’Oreal",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/a/a7/L%27Oreal_logo.svg",
      category: "Skincare & Beauty",
    },
  ];

  return (
    <div className="showcase-container">
      {/* CATEGORY BOX */}
      <div className="showcase-box">
        <div className="showcase-header">
          <h2>Shop by Category</h2>
          <span
            className="view-all"
            onClick={() => {
              if (onViewAll) onViewAll();
            }}
          >
            View All →
          </span>
        </div>
        <div className="showcase-grid">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="showcase-card"
              onClick={() => {
                if (onCategoryClick) onCategoryClick(cat.title);
              }}
            >
              <div className="image-wrapper">
                <img src={cat.image} alt={cat.title} />
              </div>
              <p className="title">{cat.title}</p>
              <p className="price">{cat.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* BRANDS BOX */}
      <div className="showcase-box">
        <div className="showcase-header">
          <h2>Top Brands</h2>
          <span
            className="view-all"
            onClick={() => {
              if (onViewAll) onViewAll();
            }}
          >
            View All →
          </span>
        </div>
        <div className="showcase-grid">
          {brands.map((brand, i) => (
            <div
              key={i}
              className="showcase-card"
              onClick={() => {
                if (onBrandClick) onBrandClick(brand.title);
              }}
            >
              <div className="image-wrapper">
                <img src={brand.image} alt={brand.title} />
              </div>
              <p className="title">{brand.title}</p>
              <p className="price">{brand.category}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryAndBrandShowcase;
