import React, { useState } from 'react';
import categories from './categorydata';
import './category.css';

const CategoryFilterMenu = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    
    const handleCategorySelection = (mainItems, subItems) => {
        console.log(`Selected: ${mainItems} - ${subItems}`);
        setMenuVisible(false);
    };

    return (
        <div className="main-menu">      {/*STILL HAVE TO DO SOMNE CHANGES HERE WHILE DOING CSS*/}
            <button 
                className="menu-btn"
                onClick={() => setMenuVisible(!menuVisible)} 
                aria-label="open category menu"
            >
                <span className="menu-line">Categories</span>
                <span className="menu-line"></span>
                <span className="menu-line"></span>
            </button>
            
            {menuVisible && (
                <div className="category-dropdown">
                    <div className="panel-header">
                        <h3>Categories</h3>
                        
                    </div>
                    <div className="category-list">
                        {categories.map((category) => (
                            <div key={category.id} className="category-section">
                                <strong className="section-title">{category.name}</strong>
                                <div className="subcategory-list">
                                    {category.subcategories.map((subItem) => (
                                        <button 
                                            key={subItem.id} 
                                            className="sub-category-options"
                                            onClick={() => handleCategorySelection(category.name, subItem.name)}
                                        >
                                            !{subItem.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            ))}
                            </div>
                            </div>
            )}
            </div>
    );
};
    export default CategoryFilterMenu;