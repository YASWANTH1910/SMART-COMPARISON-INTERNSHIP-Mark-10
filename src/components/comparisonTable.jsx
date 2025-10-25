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
                  <th key={product.id}>{product.name}</th>
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
              {selectedProducts[0]?.features && (
                Object.keys(selectedProducts[0].features).map((key) => (
                  <tr key={key}>
                    <td>{key}</td>
                    {selectedProducts.map((p) => (
                      <td key={p.id + key}>{p.features?.[key] || "-"}</td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;
