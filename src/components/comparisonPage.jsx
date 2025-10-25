import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./comparisonPage.css";

const ComparisonPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    if (location.state?.selectedProducts) {
      setSelectedProducts(location.state.selectedProducts);
    } else {
      // if user directly opens /compare without selecting products
      navigate("/");
    }
  }, [location, navigate]);

  if (!selectedProducts.length) return null;

  return (
    <div className="comparison-page">
      {/* 🧭 Left filter sidebar */}
      <aside className="filter-sidebar">
        <h3>Filter Options</h3>
        <label>
          <input type="checkbox" /> Show only Price
        </label>
        <label>
          <input type="checkbox" /> Show only Ratings
        </label>
        <label>
          <input type="checkbox" /> Show only Description
        </label>
        <button onClick={() => navigate("/")}>⬅ Back to Home</button>
      </aside>

      {/* 📊 Comparison Table */}
      <section className="comparison-content">
        <h2>Product Comparison</h2>
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Feature</th>
              {selectedProducts.map((p) => (
                <th key={p.id}>{p.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Price</td>
              {selectedProducts.map((p) => (
                <td key={p.id}>₹{p.price}</td>
              ))}
            </tr>
            <tr>
              <td>Rating</td>
              {selectedProducts.map((p) => (
                <td key={p.id}>⭐{p.rating}</td>
              ))}
            </tr>
            <tr>
              <td>Category</td>
              {selectedProducts.map((p) => (
                <td key={p.id}>{p.category}</td>
              ))}
            </tr>
            <tr>
              <td>Description</td>
              {selectedProducts.map((p) => (
                <td key={p.id}>{p.description}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default ComparisonPage;
