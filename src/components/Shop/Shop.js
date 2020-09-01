import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import  { addToDatabaseCart } from '../../utilities/databaseManager'


const Shop = () => {
    const firstTen = fakeData.slice(0,10);
    const [products, setProducts] = useState(firstTen);
    const [cart, setCart] = useState([]);
    

    const handleAddProduct = (product) => {
        
        const newCart = [...cart, product];
        setCart(newCart); // add new product.

        // add to local storage [ from utilities file]
        const sameProduct = newCart.filter(pd => pd.key === product.key);
        const count = sameProduct.length;
        addToDatabaseCart(product.key, count);
    }

    return (
        <div className="shop-container">
           <div className="product-container">
               {
                   products.map( pd => <Product 
                    key = {pd.key} // for remove "key" error
                    showAddToCart = {true} // for condition 
                    handleAddProduct = {handleAddProduct}
                    product = {pd} 
                    >  </Product> )
               }
           </div> 
           <div className="cart-container">
               <Cart cart= {cart} ></Cart>
           </div>
            
        </div>
    );
};

export default Shop;