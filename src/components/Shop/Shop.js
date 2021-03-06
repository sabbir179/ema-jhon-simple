import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import  { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager'
import { Link } from 'react-router-dom';

const Shop = () => {
    const firstTen = fakeData.slice(0,10);
    const [products, setProducts] = useState(firstTen);
    const [cart, setCart] = useState([]);
    
    // we show cart information in Shop page if we already added any data in the cart [multiple page]
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart); // we can get all product's key from database
        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find( pd => pd.key === existingKey );
            product.quantity = savedCart[existingKey];
            // console.log(existingKey, savedCart[existingKey]);
            return product;
        } )
        setCart(previousCart);
    }, [])




    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count =1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        
        setCart(newCart); // add new product.

        // add to local storage [ from utilities file]
        
        addToDatabaseCart(product.key, count);
    }

    return (
        <div className="twin-container">
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
               <Cart cart= {cart} >
                <Link to ="/review">
                    <button className="main-button" > Review order</button> </Link>
               </Cart>
           </div>
            
        </div>
    );
};

export default Shop;