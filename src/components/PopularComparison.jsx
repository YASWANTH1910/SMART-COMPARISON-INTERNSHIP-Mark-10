import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PopularComparison.css";

const PopularComparison = () => {
  // store a Map of products keyed by lowercased id
  const [products, setProducts] = useState(new Map());
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        const map = new Map();

        // Case: data is an array of categories with `.subcategories[].products[]`
        if (Array.isArray(data)) {
          data.forEach((cat) => {
            (cat.subcategories || []).forEach((sub) => {
              (sub.products || []).forEach((p) => {
                if (p && p.id) map.set(String(p.id).toLowerCase(), p);
              });
            });
          });
        } else if (data && typeof data === "object") {
          // Case: data is an object of categories, each containing arrays of products
          Object.values(data).forEach((categoryObj) => {
            if (!categoryObj) return;
            Object.values(categoryObj).forEach((maybeArr) => {
              if (Array.isArray(maybeArr)) {
                maybeArr.forEach((p) => {
                  if (p && p.id) map.set(String(p.id).toLowerCase(), p);
                });
              }
            });
          });
        }

        setProducts(map);
      })
      .catch((err) => console.error("Failed to load products:", err));
  }, []);

                                                                                        const popularComparisons = [
                                                                                            { leftId: "X1", rightId: "X2" },
                                                                                                { leftId: "x5", rightId: "x4" },
                                                                                                    { leftId: "a1", rightId: "a2" },
                                                                                                        { leftId: "a3", rightId: "a4" },
                                                                                                            { leftId: "h1", rightId: "h2" },
                                                                                                                { leftId: "w1", rightId: "w2" },
                                                                                                                    { leftId: "ha1", rightId: "ha2" },
                                                                                                                        { leftId: "bike2", rightId: "bike3" },
                                                                                                                          ];

                                                                                                                            const getProductById = (id) => products.get?.(String(id).toLowerCase());

                                                                                                                              const handleClick = (leftId, rightId) => {
                                                                                                                                  const left = getProductById(leftId);
                                                                                                                                      const right = getProductById(rightId);
                                                                                                                                          if (left && right) {
                                                                                                                                                navigate("/compare", {
                                                                                                                                                        state: { preSelectedProducts: [left, right] },
                                                                                                                                                              });
                                                                                                                                                                  }
                                                                                                                                                                    };


                                                                                                                                                                        return (
                                                                                                                                                                            <section className="popular-comparisons">
                                                                                                                                                                                  <h2 className="section-title">Popular Comparisons</h2>
                                                                                                                                                                                        <div className="comparisons-grid">
                                                                                                                                                                                                {popularComparisons.map((pair, i) => {
                                                                                                                                                                                                          const left = getProductById(pair.leftId);
                                                                                                                                                                                                                    const right = getProductById(pair.rightId);
                                                                                                                                                                                                                              if (!left || !right) return null;

                                                                                                                                                                                                                                        return (
                                                                                                                                                                                                                                                    <div key={i} className="comparison-card" onClick={() => handleClick(pair.leftId, pair.rightId)}>
                                                                                                                                                                                                                                                                  <div className="phone-left">
                                                                                                                                                                                                                                                                                  <img src={left.image} alt={left.name} />
                                                                                                                                                                                                                                                                                                  <p>{left.name}</p>
                                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                                              <div className="vs">VS</div>
                                                                                                                                                                                                                                                                                                                                            <div className="phone-right">
                                                                                                                                                                                                                                                                                                                                                            <img src={right.image} alt={right.name} />
                                                                                                                                                                                                                                                                                                                                                                            <p>{right.name}</p>
                                                                                                                                                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                                                                                                                                                                                                        })}
                                                                                                                                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                  </section>
                                                                                                                                                                                                                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                                                                                                                                                                                                                    };

                                                                                                                                                                                                                                                                                                                                                                                                                                    export default PopularComparison;