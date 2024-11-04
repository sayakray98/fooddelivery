// Cart.js
import React, { useContext } from 'react';
import { AppContext } from '../AppContext'; // Ensure this path is correct

export default function Cart() {
    const {category ,selectedCategory } = useContext(AppContext); // Access category from context
    console.log(category,"new")

    return (
        <div className='cartsection mt-5'>
            <h1>{category[5].strCategory}Cart</h1>
            {selectedCategory.length > 0 ? (
                <div>
                    <h3>Categories:</h3>
                    <ul>
                        {selectedCategory.map((cat) => (
                            <li key={cat.idCategory}>
                                <h5>{cat.strCategory}</h5>
                                <img src={cat.strCategoryThumb} alt={cat.strCategory} />
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No categories available</p>
            )}
        </div>
    );
}
