import React, { useEffect } from "react";
import "./comparisonPage.css";
import { useNavigate } from "react-router-dom";

const ComparisonPage = ({ selectedProducts }) => {
  const navigate = useNavigate();

  // Redirect to home if not enough products selected
  useEffect(() => {
    if (!selectedProducts || selectedProducts.length < 2) {
      navigate("/");
    }
  }, [selectedProducts, navigate]);

  // Fallback: show nothing if no products
  if (!selectedProducts || selectedProducts.length < 2) {
    return (
      <div className="comparison-empty">
        <h2>⚠ Please select at least 2 products to compare.</h2>
      </div>
    );
  }

  return (
    <div className="comparison-page">
      {/* 🧭 Sidebar Filters */}
      <aside className="filter-sidebar">
        <h3>Filters</h3>
        <label>
          <input type="checkbox" /> Show only Price
        </label>
        <label>
          <input type="checkbox" /> Show only Ratings
        </label>
        <label>
          <input type="checkbox" /> Show only Description
        </label>
        <button onClick={() => navigate("/")} className="back-btn">
          ⬅ Back to Home
        </button>
      </aside>

      {/* 📊 Comparison Table */}
      <section className="comparison-content">
        <h2>Product Comparison</h2>

        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                {selectedProducts.map((p) => (
                  <th key={p.id}>{String(p.name || "Unnamed Product")}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Image</td>
                {selectedProducts.map((p) => (
                  <td key={p.id}>
                    <img
                      src={String(p.image || "/images/no-image.png")}
                      alt={String(p.name || "Product")}
                      onError={(e) => (e.target.src = "/images/no-image.png")}
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "10px",
                        objectFit: "contain",
                      }}
                    />
                  </td>
                ))}
              </tr>

             <tr>
                 <td>Price</td>
                 {selectedProducts.map((p) => (
                   <td key={p.id}>{`₹${p.price || "N/A"}`}</td>
                ))}
              </tr>
              <tr>
                <td>Rating</td>
                {selectedProducts.map((p) => (
                  <td key={p.id}>{`${p.rating || "N/A"}`}</td>
                ))}
              </tr>

              <tr>
                <td>Category</td>
                {selectedProducts.map((p) => (
                  <td key={p.id}>{String(p.category || "N/A")}</td>
                ))}
              </tr>

              <tr>
                <td>Description</td>
                {selectedProducts.map((p) => (
                  <td key={p.id}>{String(p.description || "N/A")}</td>
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