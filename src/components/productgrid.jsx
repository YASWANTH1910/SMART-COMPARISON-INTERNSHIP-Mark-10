import React from "react";
import { useNavigate } from "react-router-dom";
import "./productgrid.css"; 

export default function ProductGrid() {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "OnePlus 15",
      price: "₹72,999",
      rating: 5,
      image: "https://via.placeholder.com/300x400?text=OnePlus+15",
      category: "mobiles",
      subCategory: "oneplus",
    },
    {
      id: 2,
      name: "Samsung S24 Ultra",
      price: "₹1,29,999",
      rating: 5,
      image: "https://via.placeholder.com/300x400?text=Samsung+S24+Ultra",
      category: "mobiles",
      subCategory: "samsung",
    },
    {
      id: 3,
      name: "iPhone 16 Pro",
      price: "₹1,39,999",
      rating: 5,
      image: "https://via.placeholder.com/300x400?text=iPhone+16+Pro",
      category: "mobiles",
      subCategory: "apple",
    },
    {
      id: 4,
      name: "Vivo X200 Pro",
      price: "₹89,999",
      rating: 4,
      image: "https://via.placeholder.com/300x400?text=Vivo+X200+Pro",
      category: "mobiles",
      subCategory: "vivo",
    },
  ];

  const goToProductPage = (product) => {
    navigate(`/products?cat=${product.category}&subcat=${product.subCategory}`);
  };

  const viewAll = () => {
    navigate("/products");
  };

  return (
    <div className="product-grid-container">
      
      {/* HEADER */}
      <div className="grid-header">
        <h2 className="grid-title">Popular Mobiles</h2>

        <div className="view-all-btn" onClick={viewAll}>
          View All →
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="product-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => goToProductPage(product)}
          >
            <div className="product-image-wrapper">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
            </div>

            <div className="product-name">{product.name}</div>

            <div className="product-price">{product.price}</div>

            <div className="product-rating">
              {Array.from({ length: product.rating }).map((_, idx) => (
                <span key={idx}>⭐</span>
              ))}
            </div>

            <button
              className="compare-btn"
              onClick={(e) => {
                e.stopPropagation();
                goToProductPage(product);
              }}
            >
              Compare
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
