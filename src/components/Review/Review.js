import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [cart, setCart] = useState([]);

    //remove product from review page
    const removeProduct = (productKey) => {
        
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey); // this method comes from databaseManager
    }

    useEffect(() => {
        // cart data
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        // const counts = productKeys.map( key => savedCart[key]); // pass the value of productkey array to saveCart
        const cartProducts = productKeys.map( key => {
            const product = fakeData.find( pd => pd.key === key );
            product.quantity = savedCart[key]; // ordered product quantity will show
            return product;
        });
        
        setCart(cartProducts);

    }, [])
    return (
        <div>
            <h1>Cart Items: {cart.length}</h1> 
            { 
            cart.map(pd => <ReviewItem 
                key = {pd.key} // for error {key} free 
                removeProduct = {removeProduct} // the value removeProduct
                product = {pd}></ReviewItem> )
            }
            
        </div>
    );
};

export default Review;