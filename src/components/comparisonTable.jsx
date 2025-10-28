import React from "react";
import "./comparisonTable.css";

const ComparisonTable = ({ selectedProducts, onClose }) => {
  if (!selectedProducts.length) return null;

  return (
    <div className="comparison-modal">
      <div className="comparison-content">
        <h2>Product Comparison</h2>
        <button className="close-btn" onClick={onClose}>✖</button>

        <div className="comparison-table">
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                {selectedProducts.map((product) => (
                  <th key={product.id}>{String(product.name || "Unnamed")}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Price</td>
                {selectedProducts.map((p) => (
                  <td key={p.id}>₹{String(p.price || "0")}</td>
                ))}
              </tr>
              <tr>
                <td>Rating</td>
                {selectedProducts.map((p) => (
                  <td key={p.id}>⭐ {String(p.rating || "N/A")}</td>
                ))}
              </tr>
              <tr>
                <td>Category</td>
                {selectedProducts.map((p) => (
                  <td key={p.id}>{String(p.category || "Unknown")}</td>
                ))}
              </tr>
              <tr>
                <td>Description</td>
                {selectedProducts.map((p) => (
                  <td key={p.id}>{String(p.description || "-")}</td>
                ))}
              </tr>

              {selectedProducts[0]?.features &&
                Object.keys(selectedProducts[0].features).map((key) => (
                  <tr key={key}>
                    <td>{String(key)}</td>
                    {selectedProducts.map((p) => (
                      <td key={p.id + key}>
                        {String(p.features?.[key] || "-")}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;
