import React from 'react';
import './negotiation.css';
import Product from '../ProductList/product';
import { useNavigate } from 'react-router-dom';

const Negotiation = ({ productsUser1, productsUser2, userId1, userId2, negotiationId }) => {
    const navigate = useNavigate();
    const handleAddCardsToNegotiation = (nId, uId) => {
        // const negotiationIdMock = 789;
        // const userId1Mock = 132456;
        // navigate(`/add-cards-to-negotiation/${negotiationIdMock}/${userId1Mock}`);
        navigate(`/add-cards-to-negotiation/${nId}/${uId}`);
    }

    const handleRemoveCardsFromNegotiation = (nId, uId) => {
        // const negotiationIdMock = 789;
        // const userId1Mock = 132456;
        // navigate(`/remove-cards-from-negotiation/${negotiationIdMock}/${userId1Mock}`);
        navigate(`/add-cards-to-negotiation/${nId}/${uId}`);
    }

    return (
        <div className="product-screen-container-negotiation">
            <div className="product-row-negotiation">
                <div className="row-header-negotiation">
                    <h2>Usuario 1 oferece:</h2>
                    <button className="edit-button-negotiation" onClick={() => handleAddCardsToNegotiation(userId1, negotiationId)}>Add cards</button>
                    <button className="edit-button-negotiation" onClick={() => handleRemoveCardsFromNegotiation(userId1, negotiationId)}>Remove cards</button>
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
                    <button className="edit-button-negotiation" onClick={() => handleAddCardsToNegotiation(userId2, negotiationId)}>Add cards</button>
                    <button className="edit-button-negotiation" onClick={() => handleRemoveCardsFromNegotiation(userId2, negotiationId)}>Remove cards</button>
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
