import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';

const Shop = () => {
    const firstTen = fakeData.slice(0,10);
    const [products, setProducts] = useState(firstTen);
    const [cart, setCart] = useState([]);
    

    const handleAddProduct = (product) => {
        
        const newCart = [...cart, product];
        setCart(newCart);
    }

    return (
        <div className="shop-container">
           <div className="product-container">
               {
                   products.map( pd => <Product 
                    showAddToCart = {true}
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