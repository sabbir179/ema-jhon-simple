import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'

const Review = () => {
    const [cart, setCart] = useState([]);

    const [orderPlaced, setOrderPlaced] = useState(false);

    // Order place to cart items
    const handlePlaceOrder = () => {
        setCart([]); // clear cart 
        setOrderPlaced(true);
        processOrder(); // order will be process and go to database
    }

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

    let thankyou;
    if(orderPlaced){
        thankyou = <h1>Your order is placed <br/> <img src={happyImage} alt=""/></h1>
    } 
    return (
        <div className="twin-container">
            <div className="product-container"> 
                { 
                cart.map(pd => <ReviewItem 
                    key = {pd.key} // for error {key} free 
                    removeProduct = {removeProduct} // the value removeProduct
                    product = {pd}></ReviewItem> )
                }

                {
                    thankyou
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart} >
                    <button onClick = {handlePlaceOrder} className="main-button">Place order</button>
                </Cart>
            </div> 
            
            
        </div>
    );
};

export default Review;