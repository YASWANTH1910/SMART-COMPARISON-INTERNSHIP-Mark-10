import React, { useRef, useEffect } from "react";

const TopProducts = () => {
  const scrollRef = useRef(null);

  const products = [  
    { name: "Tata Nexon", price: " ₹11.5 Lakh", image: "https://wallpapers.com/images/featured/blank-white-background-xbsfzsltjksfompa.jpg" },
    { name: "Mahindra Scorpio-N", price: " ₹25.5 Lakh", image: "https://www.carandbike.com/_next/image?url=https%3A%2F%2Fimages.carandbike.com%2Fcar-images%2Flarge%2Fmahindra%2Fscorpio-n%2Fmahindra-scorpio-n.jpg%3Fv%3D27&w=1600&q=75" },
    { name: "Tata Nexon", price: " ₹11.5 Lakh", image: "https://images.carandbike.com/car-images/orig/tata/nexon/tata-nexon.jpg?v=74" },
    { name: "iPhone 17 Pro Max", price: "₹149999", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtIgDZAh57-CK8OIyaqF8QgLysjvMdGWkcJA&s" },
    { name: "ASUS ROG Phone 9 Pro", price: " ₹95999", image: "https://sc04.alicdn.com/kf/Hd2e3bdad17724a5c98ff1c28ffc26bc4J.jpg" },
    { name: "Watches", price: " ₹4999", image: "https://static.helioswatchstore.com/media/catalog/product/c/e/ceciwgn0019503w_1_3.jpg" },
    { name: "Shoes", price: " ₹2999", image: "https://offlimits.co.in/cdn/shop/files/OCM-64305_1.jpg?v=1720259294" },
    { name: "Headphones", price: " ₹7999", image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2025/JULY/30/EA7AcMUK_71d8d2941dfa4342a412402a86982cbe.jpg" },
    { name: "Backpacks", price: " ₹2999", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUYlyx_9Q9r5oqYnqwSXypb7pjq7G2HYKMXw&s" },
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
      }}>
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
