import React from 'react';
import './negotiation.css';
import Product from '../ProductList/product';

const Negotiation = ({ productsUser1, productsUser2 }) => {
    return (
        <div className="product-screen-container-negotiation">
            <div className="product-row-negotiation">
                <div className="row-header-negotiation">
                    <h2>Usuario 1 oferece:</h2>
                    <button className="edit-button-negotiation">Edit</button>
                </div>
                <div className="product-scroll-container-negotiation">
                {productsUser1.map((product) => (
                    <Product name={product.name} image={product.image} sku={product.sku} />
                ))}
                </div>
            </div>
            <div className="product-row-negotiation">
                <div className="row-header-negotiation">
                    <h2>Usuario 2 oferece:</h2>
                    <button className="edit-button-negotiation">Edit</button>
                </div>
                <div className="product-scroll-container-negotiation">
                    {productsUser2.map((product) => (
                        <Product name={product.name} image={product.image} sku={product.sku} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Negotiation;
