import React from "react";
import { useNavigate } from "react-router-dom";
import "./showCase.css";

const CategoryAndBrandShowcase = () => {
  const navigate = useNavigate();

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
        "data:image/jpeg;base64,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",
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
        "data:image/jpeg;base64,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",
      category: "Electronics",
    },
    {
      title: "IKEA",
      image:
        "https://imgs.search.brave.com/g2OTq7OcJwr-jItgVhdcBPGhMRv24sc2ajDpLD7EM74/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9taXIt/czMtY2RuLWNmLmJl/aGFuY2UubmV0L3By/b2plY3RzLzQwNC9h/NjljYjgxOTg4NTU2/MDUuNjY0Y2I2NmM3/MjkwYi5wbmc",
      category: "Furniture",
    },
    {
      title: "ZARA",
      image:
        "data:image/png;base64,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",
      category: "Fashion",
    },
    {
      title: "L’Oreal",
      image:
        "https://imgs.search.brave.com/HPoWVHI_rkNoW-4IAUKB1Byu2IT-X2qCnbglRdnJ3SA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bXloYWlyYW5kYmVh/dXR5LmNvLnVrL2lt/Zy9icmFuZHMvNDA0/LnBuZw",
      category: "Skincare & Beauty",
    },
  ];

  // Navigate to products page
  const handleNavigate = (category) => {
    navigate("/products", { state: { category } });
  };

  return (
    <div className="showcase-container">
      {/* CATEGORY BOX */}
      <div className="showcase-box">
        <div className="showcase-header">
          <h2>Shop by Category</h2>
          <span onClick={() => navigate("/products")}>View All →</span>
        </div>
        <div className="showcase-grid">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="showcase-card"
              onClick={() => handleNavigate(cat.title)}
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
          <span onClick={() => navigate("/products")}>View All →</span>
        </div>
        <div className="showcase-grid">
          {brands.map((brand, i) => (
            <div
              key={i}
              className="showcase-card"
              onClick={() => handleNavigate(brand.category)}
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
