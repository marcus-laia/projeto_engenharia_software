import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_CARDS } from "../../graphql/mutations/addCardsMutation";
import "./addCards.css";

const AddCards = ({ products }) => {
  const [addCards] = useMutation(ADD_CARDS);
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

  const handleAddCards = async () => {
    const selectedIds = Object.keys(selectedProducts)
      .filter((productId) => selectedProducts[productId])
      .map((productId) => parseInt(productId));

    try {
      await addCards({
        variables: {
          productIds: selectedIds,
          userId: 123 // TO DO: handle user id
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
    <div className="addCards-container">
      <div className="product-list-addCards">
        {products.map((product) => (
          <div key={product.id} className="product-row-addCards">
            <img
              src={product.image}
              alt={product.name}
              className="product-image-addCards"
            />
            <div className="product-details-addCards">
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
      <button className="add-cards-button-add-cards" onClick={handleAddCards}>Add my cards</button>
      {showNotification && (
        <div className={`notification-add-cards ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default AddCards;
