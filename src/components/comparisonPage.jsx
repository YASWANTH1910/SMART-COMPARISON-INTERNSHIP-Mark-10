import React from "react";
import "./comparisonPage.css";
import { useNavigate } from "react-router-dom";

const ComparisonPage = ({ selectedProducts }) => {
  const navigate = useNavigate();

  if (!selectedProducts || selectedProducts.length < 2) {
    navigate("/");
    return null;
  }

  return (
    <div className="comparison-page">
      {/* Sidebar */}
      <aside className="filter-sidebar">
        <h3>Filters</h3>
        <label><input type="checkbox" /> Show only Price</label>
        <label><input type="checkbox" /> Show only Ratings</label>
        <label><input type="checkbox" /> Show only Description</label>
        <button onClick={() => navigate("/")}>⬅ Back to Home</button>
      </aside>

      {/* Main content */}
      <section className="comparison-content">
        <h2>Product Comparison</h2>
        <div className="comparison-table-wrapper">
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
                <td>Image</td>
                {selectedProducts.map((p) => (
                  <td key={p.id}>
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{ width: "100px", height: "100px", borderRadius: "8px" }}
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td>Price</td>
                {selectedProducts.map((p) => (
                  <td key={p.id}>₹{p.price}</td>
                ))}
              </tr>
              <tr>
                <td>Rating</td>
                {selectedProducts.map((p) => (
                  <td key={p.id}>⭐ {p.rating}</td>
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
        </div>
      </section>
    </div>
  );
};

export default ComparisonPage;
