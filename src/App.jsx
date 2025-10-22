import React, { useState } from 'react';
import CategoryFilterMenu from './components/categorymenu';
import ProductList from './components/productList';
import Navbar from './components/navBar';
import './App.css';

const productsData = [
  { id: 1, name: 'iPhone 14', price: 999, rating: 4.5, category: 'Electronics', subcategory: 'Smartphones', image: '📱', description: 'Latest smartphone with advanced features' },
  { id: 2, name: 'MacBook Pro', price: 1999, rating: 4.7, category: 'Electronics', subcategory: 'Laptops', image: '💻', description: 'Powerful laptop for professionals' },
  { id: 3, name: 'Wireless Headphones', price: 199, rating: 4.3, category: 'Electronics', subcategory: 'Audio', image: '🎧', description: 'Noise cancelling wireless headphones' },
  { id: 4, name: 'Men T-Shirt', price: 25, rating: 4.0, category: 'Fashion', subcategory: 'Men Clothing', image: '👕', description: 'Comfortable cotton t-shirt' },
  { id: 5, name: 'Women Jeans', price: 45, rating: 4.2, category: 'Fashion', subcategory: 'Women Clothing', image: '👖', description: 'Stylish denim jeans' },
  { id: 6, name: 'Running Shoes', price: 80, rating: 4.4, category: 'Fashion', subcategory: 'Footwear', image: '👟', description: 'Comfortable running shoes' },
  { id: 7, name: 'Sofa', price: 599, rating: 4.1, category: 'Home', subcategory: 'Furniture', image: '🛋️', description: 'Comfortable 3-seater sofa' },
  { id: 8, name: 'Coffee Maker', price: 89, rating: 4.0, category: 'Home', subcategory: 'Kitchen', image: '☕', description: 'Automatic coffee machine' }
];

function App() {
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [currentFilter, setCurrentFilter] = useState({
    mainItems: 'All',
    subItems: 'All'
  });

  const handleCategorySelect = (mainItems, subItems) => {
    console.log(`Selected Category: ${mainItems} - ${subItems}`);
    setCurrentFilter({ mainItems, subItems });

    if (mainItems === 'All') {
      setFilteredProducts(productsData);
    } else {
      const filtered = productsData.filter(
        (product) =>
          product.category === mainItems &&
          (subItems === 'All' || product.subcategory === subItems)
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="Appjsx">
      {/* ✅ Navbar added here */}
      <Navbar />

      <header className="appjsx-header">
        <div>
          <CategoryFilterMenu onCategorySelect={handleCategorySelect} />
        </div>
      </header>

      <main className="appjsx-main">
        <div className="productlist-box">
          <ProductList
            products={filteredProducts}
            currentFilter={currentFilter}
          />
        </div>
      </main>

      <footer className="appjsx-footer">
        <p>© 2024 Smart Comparison. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
