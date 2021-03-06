import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import './ProductDetail.css'

const ProductDetail = () => {
    const {productKey} = useParams(); // custom hook, which is connected with product value
    const product = fakeData.find(pd => pd.key === productKey);
    // console.log(product);
    return (
        <div>
            <h1 className="detail" > Product  Detail</h1>
            <Product showAddToCart = {false} product = {product}>  </Product>
        </div>
    );
};

export default ProductDetail;