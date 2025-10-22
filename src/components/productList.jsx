import React from 'react';
import "./productList.css";

const ProductList = ({ products , currentFilter }) => {
    if (!products || products.length === 0) {
        return(
            <div className="not-found-container">
                <div className="not-found-content">
<h4>Oops!! Your Item Not Found</h4>
<b>Try Choosing A Different Category</b>
</div>
            </div>
        );
 }
 return (
    <div className="product-list-header">
        <div className="productlist-infos">
            <h2>
                {currentFilter.mainItems === 'All' ? 'All Products' : `${currentFilter.mainItems} - ${currentFilter.subItems}`
                } {/* we have state these filterdProducts in App.jsx */}
            </h2>
            <span className="counts"> ({products.length} items) </span>
        </div>
        <div className="product-boxes">
            {products.map((product) => (
                <div key={product.id} className="product-cards">
                    <div className="product-image">
                        {product.image}
                        </div>
                        <div className="product-info">
                           <h3 className='names'> {product.name}</h3>
                           <p className="product-description">
                            {product.description}
                           </p>
                           <div className="product-price-rating">
                            {product.rating}⭐
                            <div className="product-category">
                                {product.category}
                            </div>
                            <div className="product-price">
                                {`₹${product.price}`}
                            </div>
                           </div>
                        </div>
                    </div>
                
            ))}
        </div>
    </div>
    );
};

    export default ProductList;