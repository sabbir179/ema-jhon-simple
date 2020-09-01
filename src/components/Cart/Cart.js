import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart;
    // console.log(cart);
    // const totalPrice = cart.reduce ((total, prd) => total + prd.price, 0 )

    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        totalPrice = totalPrice + product.price * product.quantity;
        
    }

    let shipping = 0;
    if(totalPrice > 35){
        shipping = 0;
    }
    else if(totalPrice > 15){
        shipping = 4.99;
    }
    else if(totalPrice > 0){
        shipping = 12.99;
    }

    const tax = totalPrice / 10;
    const grandTotal = totalPrice + shipping + Number (tax);

    

    const fromatNumber = num => {
        const precision = num.toFixed(2);
        return Number (precision);
    }


    return (
        <div>
            <h4 className="text-primary" >Order Summary</h4>
            <p>Items ordered: {cart.length} </p>
            <p>Product price:  {fromatNumber(totalPrice)} </p>
            <p> <small>Shipping cost: {shipping} </small> </p>
            <p><small>Tax: {fromatNumber(tax) } </small> </p>
            <p>Grand Total price: { fromatNumber (grandTotal)} </p>
            <br/>
            <Link to ="/review"> <button className="main-button" > Review order</button> </Link>
            
        </div>
    );
};

export default Cart;