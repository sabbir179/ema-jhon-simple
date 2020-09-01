import React, { useEffect, useState } from 'react';
import { getDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [cart, setCart] = useState([])

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
                product = {pd}></ReviewItem> )
            }
            
        </div>
    );
};

export default Review;