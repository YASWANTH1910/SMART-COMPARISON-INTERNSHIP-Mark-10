import React from "react";
import "./comparisonTable.css";

const ComparisonTable = ({ selectedProducts }) => {
  if (!selectedProducts?.length) return null;

  // ✅ Collect all unique feature keys (both top-level and inside features)
  const allKeys = Array.from(
    new Set(
      selectedProducts.flatMap((p) => [
        ...Object.keys(p),
        ...(p.features ? Object.keys(p.features) : []),
      ])
    )
  ).filter((key) => !["id", "image", "name", "features"].includes(key)); // exclude non-informative keys

  return (
    <div className="comparison-table-wrapper">
      <table className="comparison-table">
        <thead>
          <tr>
            <th>Feature</th>
            {selectedProducts.map((product) => (
              <th key={product.id}>{product.name || "Unnamed"}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {allKeys.map((key) => (
            <tr key={key}>
              <td>{key}</td>
              {selectedProducts.map((p) => {
                // ✅ Try both direct and features-based values; fallback to underscore
                const rawValue =
                p[key] ?? (p.features && key in p.features ? p.features[key] : undefined);
                const value = rawValue === undefined || rawValue === null ? "_" : rawValue;
                return <td key={p.id + key}>{String(value)}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
