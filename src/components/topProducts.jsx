import React, { useRef, useEffect } from "react";

const TopProducts = () => {
  const scrollRef = useRef(null);

  const products = [
    { name: "Jewellery & More", price: "From ₹999", image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTLOiQdLl--TRDR6z0UDAgNPVOCHSe0jp-NC6BwApt2Bu3ForTSJKp39iAx9Krox5790A5xSCIHG_cS0QA3USuGp1eCuu6bIEhbNAQFC8IzKk2MrYF9kyXd" },
    { name: "Clothes", price: "From ₹999", image: "https://nimbuscluster.blob.core.windows.net/server01/hrx/product/productImage-38gbSSJ24kq6rgB96WFSO-1662610620" },
    { name: "Mobiles", price: "From ₹24999", image: "https://www.themobileindian.com/wp-content/uploads/2022/06/Rog-phone-6-600x600.png" },
    { name: "Mobiles", price: "From ₹99999", image: "https://www.themobileindian.com/wp-content/uploads/2022/06/Rog-phone-6-600x600.png" },
    { name: "Watches", price: "From ₹4999", image: "https://static.helioswatchstore.com/media/catalog/product/c/e/ceciwgn0019503w_1_3.jpg" },
    { name: "Shoes", price: "From ₹2999", image: "https://offlimits.co.in/cdn/shop/files/OCM-64305_1.jpg?v=1720259294" },
    { name: "Headphones", price: "From ₹7999", image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2025/JULY/30/EA7AcMUK_71d8d2941dfa4342a412402a86982cbe.jpg" },
    { name: "Backpacks", price: "From ₹2999", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUYlyx_9Q9r5oqYnqwSXypb7pjq7G2HYKMXw&s" },
  ];

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const amount = 280;
    const max = container.scrollWidth - container.clientWidth;

    let next =
      direction === "left"
        ? container.scrollLeft - amount
        : container.scrollLeft + amount;

    next = Math.max(0, Math.min(max, next));
    container.scrollTo({ left: next, behavior: "smooth" });
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#f5f7fa",
        padding: "14px 0",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        margin: "0 auto 18px",
        width: "90%",
        position: "relative",
        overflow: "hidden", // ✅ back to hidden for clean edges
      }}
    >
      <h2
        style={{
          marginLeft: "18px",
          marginBottom: "10px",
          fontSize: "22px",
          fontWeight: 700,
          color: "#222",
        }}
      >
        Top Products
      </h2>

      {/* Left Arrow */}
      <button
        aria-label="Scroll left"
        onClick={() => scroll("left")}
        style={arrowStyle("left")}
      >
        &#8592;
      </button>

      {/* Right Arrow */}
      <button
        aria-label="Scroll right"
        onClick={() => scroll("right")}
        style={arrowStyle("right")}
      >
        &#8594;
      </button>

      {/* Product Carousel */}
      <div
        ref={scrollRef}
        className="top-products-scroll"
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "16px",
          paddingLeft: "150px",     // ✅ minimal left padding
          paddingRight: "30px",    // ✅ enough room for last card
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          scrollSnapType: "x mandatory", // ✅ aligns cleanly
        }}
      >
        {products.map((item, idx) => (
          <div
            key={idx}
            style={{
              flex: "0 0 160px",
              textAlign: "center",
              cursor: "pointer",
              scrollSnapAlign: "start", // ✅ ensures clean left alignment
            }}
            onMouseEnter={(e) => {
              const img = e.currentTarget.querySelector("img");
              if (img) img.style.transform = "scale(1.06)";
            }}
            onMouseLeave={(e) => {
              const img = e.currentTarget.querySelector("img");
              if (img) img.style.transform = "scale(1)";
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "100%",
                height: "160px",
                objectFit: "cover",
                borderRadius: "8px",
                transition: "transform 180ms ease",
                display: "block",
                pointerEvents: "none",
              }}
              onError={(e) => {
                e.currentTarget.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Crect width='100%25' height='100%25' fill='%23ddd'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23777' font-size='12'%3ENo+image%3C/text%3E%3C/svg%3E";
              }}
            />
            <p style={{ fontSize: 14, fontWeight: 500, margin: "8px 0 4px" }}>
              {item.name}
            </p>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: 0 }}>
              {item.price}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        .top-products-scroll::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

const arrowStyle = (side) => ({
  position: "absolute",
  [side]: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  border: "1px solid #ddd",
  background: "#fff",
  cursor: "pointer",
  zIndex: 20,
  boxShadow: "0 2px 5px rgba(0,0,0,0.12)",
});

export default TopProducts;
