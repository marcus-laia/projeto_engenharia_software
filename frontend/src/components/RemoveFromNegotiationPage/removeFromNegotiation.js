import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { REMOVE_CARDS_FROM_NEGOTIATION } from "../../graphql/mutations/removeCardsFromNegotiation";
import "./removeFromNegotiation.css";

const RemoveFromNegotiation = ({ products }) => {
  const [removeCardsFromNegotiation] = useMutation(REMOVE_CARDS_FROM_NEGOTIATION);
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

  const handleRemoveCardsFromNegotiation = async () => {
    const selectedIds = Object.keys(selectedProducts)
      .filter((productId) => selectedProducts[productId])
      .map((productId) => parseInt(productId));

    try {
      await removeCardsFromNegotiation({
        variables: {
          productIds: selectedIds,
          userId: Number(localStorage.getItem("userId")) // TO DO: handle user id
        },
      });
      setNotification({ message: 'Cards removed successfully!', type: 'success' });
    } catch (error) {
      setNotification({ message: 'Failed to remove cards. Please try again.', type: 'error' });
    } finally {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
        setNotification({ message: '', type: '' });
      }, 3000);
    }
    
  };

  return (
    <div className="removeCardsFromNegotiation-container">
      <h1>Remove from negotiation</h1>
      <div className="product-list-removeCardsFromNegotiation">
        {products.map((product) => (
          <div key={product.id} className="product-row-removeCardsFromNegotiation">
            <img
              src={product.image}
              alt={product.name}
              className="product-image-removeCardsFromNegotiation"
            />
            <div className="product-details-removeCardsFromNegotiation">
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
      <button className="remove-cards-button-removeCardsFromNegotiation" onClick={handleRemoveCardsFromNegotiation}>Remove selected cards</button>
      {showNotification && (
        <div className={`notification-remove-cards ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default RemoveFromNegotiation;
