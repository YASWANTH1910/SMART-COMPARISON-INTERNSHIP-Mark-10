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
        "https://imgs.search.brave.com/Xk17KdCVZGnCvGjstdW5ATRrf5OTpObixYqbRxRgVFE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLmRlbGwuY29tL2lzL2ltYWdlL0RlbGxDb250ZW50L2NvbnRlbnQvZGFtL3NzMi9wcm9kdWN0LWltYWdlcy9kZWxsLWNsaWVudC1wcm9kdWN0cy9ub3RlYm9va3MvYWxpZW53YXJlLW5vdGVib29rcy9hYzE2MjUxL21lZGlhLWdhbGxlcnkvbGFwdG9wLWFsaWVu/d2FyZS1hYzE2MjUx/LWJsdWUtbGYtZ2Fs/bGVyeS0zLnBzZD9m/bXQ9cG5nLWFscGhh",
      price: "Laptops from ₹49,999",
    },
    {
      title: "Furniture",
      image:
        "https://imgs.search.brave.com/-9jn6D_Shy2qVmtqZjIw4ielgQz-gg2OycR603WcFcA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFnZXMtbmEuc3NsLWltYWdlcy1hbWF6b24uY29tL2ltYWdlcy9J/LzgxMkJpbEd0SGVM/LmpwZw",
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
        "https://imgs.search.brave.com/X15999QdoeKl8t_5Rs3QZ0An92xlCRVn6dc1ZlM4bcs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/c2xpZGVzaGFyZWNk/bi5jb20vc3NfdGh1/bWJuYWlscy9hcHBs/ZWluY3ByZXNlbnRh/dGlvbjIwMTgtMTgw/MTAyMDc0NDU3LXRo/dW1ibmFpbC5qcGc",
      category: "Electronics",
    },
    {
      title: "IKEA",
      image:
        "https://imgs.search.brave.com/g2OTq7OcJwr-jItgVhdcBPGhMRv24sc2ajDpLD7EM74/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9taXIt/czMtY2RuLWNmLmJl/aGFuY2UubmV0L3By/b2plY3RzLzQwNC9h/NjljYjgxOTg4NTU2/MDUuNjY0Y2I2NmM3/MjkwYi5wbmc",
      category: "Furniture",
    },
    {
      title: "Louis Vuitton",
      image:
        "https://imgs.search.brave.com/fI_zv2fhs7kEGdCBj0ghvpiXzEJ2zlgX7rExLJeYqg4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bHV4Z2xvYmFsLmNvbS9jZG4vc2hvcC9maWxlcy9sdWlzdnVpdHRvbi1sb2dvLXdoaXRlLmpwZw",
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
