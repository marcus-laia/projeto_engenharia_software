import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_CARDS_TO_NEGOTIATION } from "../../graphql/mutations/addCardsToNegotiation";
import "./addToNegotiation.css";

const AddToNegotiation = ({ products }) => {
  const [addCardsToNegotiation] = useMutation(ADD_CARDS_TO_NEGOTIATION);
  const [selectedProducts, setSelectedProducts] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = false; // Set the initial selection status of each product to false
      return acc;
    }, {})
  );

  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const handleProductSelection = (productId) => {
    setSelectedProducts({
      ...selectedProducts,
      [productId]: !selectedProducts[productId],
    });
  };

  const handleAddCardsToNegotiation = async () => {
    const selectedIds = Object.keys(selectedProducts)
      .filter((productId) => selectedProducts[productId])
      .map((productId) => parseInt(productId));

    try {
      await addCardsToNegotiation({
        variables: {
          productIds: selectedIds,
          userId: Number(localStorage.getItem("userId")) // TO DO: handle user id
        },
      });
      setNotification({ message: 'Cards added successfully!', type: 'success' });
    } catch (error) {
      setNotification({ message: 'Failed to add cards. Please try again.', type: 'error' });
    } finally {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        setNotification({ message: '', type: '' });
      }, 3000);
    }
    
  };

  return (
    <div className="addCardsToNegotiation-container">
      <h1>Add to negotiation</h1>
      <div className="product-list-addCardsToNegotiation">
        {products.map((product) => (
          <div key={product.id} className="product-row-addCardsToNegotiation">
            <img
              src={product.image}
              alt={product.name}
              className="product-image-addCardsToNegotiation"
            />
            <div className="product-details-addCardsToNegotiation">
              <label htmlFor={product.id}>{product.name}</label>
            </div>
              <input
                type="checkbox"
                id={product.id}
                className
                checked={selectedProducts[product.id]}
                onChange={() => handleProductSelection(product.id)}
              />
          </div>
        ))}
      </div>
      <button className="add-cards-button-addCardsToNegotiation" onClick={handleAddCardsToNegotiation}>Add selected cards</button>
      {showNotification && (
        <div className={`notification-add-cards ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default AddToNegotiation;
