import React from "react";
import "./storeBar.css";

const stores = [
  {
    name: "Amazon",
    logo: "https://cdn1.smartprix.com/rx-iR2NxBi82-w100-h100/R2NxBi82.webp",
    url: "https://www.amazon.in/",
  },
  {
    name: "Flipkart",
    logo: "https://cdn1.smartprix.com/rx-i1jV84HS1-w100-h100/1jV84HS1.webp",
    url: "https://www.flipkart.com/",
  },
  {
    name: "Croma",
    logo: "https://cdn1.smartprix.com/rx-i4vfi1umq-w100-h100/4vfi1umq.webp",
    url: "https://www.croma.com/",
  },
  {
    name: "Samsung",
    logo: "https://cdn1.smartprix.com/rx-ircJXXuPY-w100-h100/rcJXXuPY.webp",
    url: "https://www.samsung.com/in/",
  },
  {
    name: "Myntra",
    logo: "https://cdn1.smartprix.com/rx-is3m58Ie0-w100-h100/s3m58Ie0.webp",
    url: "https://www.myntra.com/",
  },
  {name: "Purple",
    logo: "https://cdn1.smartprix.com/rx-iCZcrsaKr-w100-h100/CZcrsaKr.webp",
    url: "https://www.purplle.com/",
  }
];

const StoreBar = () => {
  return (
    <div className="store-bar">
      {stores.map((store, index) => (
        <a
          href={store.url}
          target="_blank"
          rel="noopener noreferrer"
          className="store-item"
          key={index}
        >
          <img src={store.logo} alt={store.name} className="store-logo" />
          <span>{store.name}</span>
        </a>
      ))}
    </div>
  );
};

export default StoreBar;