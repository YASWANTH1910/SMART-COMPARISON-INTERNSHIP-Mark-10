import React, { useState, useRef , useEffect } from 'react';
import './category.css';

const CategoryFilterMenu = ({onCategorySelect}) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const dropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
        if (menuVisible &&
            dropdownRef.current && 
            !dropdownRef.current.contains(event.target)) {
                setMenuVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [] );

   const categories = [
    {
        id: 1,
        name: 'Electronics',
        subcategories: [
            { id: 10, name: 'Mobiles' },
            { id: 11, name: 'Laptops' },
            { id: 12, name: 'Headphones' },
            { id: 13, name: 'Watches'},
            
        ],
    },
    {
        id: 2,
       name: 'Fashion',
        subcategories: [
            { id: 14, name: "Men's Clothing" },
            { id: 15, name: "Women's Clothing" },
            { id: 16, name: 'Footwear' },
            { id : 17, name: 'Accessories' },
        ],
    },
    {
        id: 3,
        name: 'Furniture',
        subcategories: [
            { id: 16, name: 'Beds' },
            { id: 17, name: 'Couches' },
            { id: 18, name: 'Tables' },
            { id: 19, name: 'Dressers'}
        ],
    },
    {
        id: 4,
        name: 'Skincare & Beauty',
        subcategories: [
            { id: 20, name: 'Face Wash' },
            { id: 21, name: 'Foundations' },
            { id: 22, name: 'Moisturizers' },
            { id: 23, name: 'Lipsticks'},
            {  id: 24, name: 'Eye Shadows' }
        ],
    },
];

      // Breaking down complex filtering into manageable steps
// for better readability and maintenance
//STARTED WORKING THE LOGIC FOR FILTERING AND SOME IMPROVEMENTS NEEDED
    const handleCategorySelection = ( mainItems, subItems) => {
        console.log(`Filtering: ${mainItems} - ${subItems}`);
     
        if (onCategorySelect) {
        onCategorySelect (mainItems, subItems);
      }
        setMenuVisible(false);                 
    };
        const handleShowAll = () => {
        console.log('Showing entire products');
        if (onCategorySelect) {
        onCategorySelect('All', 'All');
      }
      setMenuVisible(false);
    
    
    };

    return (
        <div className="main-menu">      {/*STILL SOME ISSUES MAY PERSIST,WILL FIX IT LATER*/}
            <button 
                className="menu-btn"
                onClick={() => setMenuVisible(!menuVisible)} 
                aria-label="open category menu"
            >
                <span className="menu-line"></span>
                <span className="menu-line"></span>
                <span className="menu-line"></span>
            </button>
            
            {menuVisible && (
                <div className="category-dropdown">
                    <div className="panel-header">
                        <h3>Categories</h3>
                        
                    </div>
                    <div className="category-list">
                        <button className='all-btn'
                        onClick ={handleShowAll}>
                            All Products
                        </button> </div>
                        <div className='category-container'>
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
                                            {subItem.name}
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
    