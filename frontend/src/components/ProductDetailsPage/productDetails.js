import React from "react";
import { Link } from "react-router-dom";
import "./productDetails.css";

const ProductDetails = ({ product }) => {
  const { name, image, sku, collection, text_description, owner_id } = product;

  return (
    <div className="product-details-container-productDetailsPage">
      <div className="product-details-productDetailsPage">
        <img src={image} alt={name} className="product-image-productDetailsPage" />
        <div className="product-info-productDetailsPage">
          <h2>{name}</h2>
          <p><strong>SKU:</strong> {sku}</p>
          <p><strong>Collection:</strong> {collection}</p>
          <p><strong>Description:</strong> {text_description}</p>
          <p><strong>Owner ID:</strong> {owner_id}</p>
          <Link to={`/chat-page/${owner_id}`} className="start-negotiation-btn-productDetailsPage">
            Start Negotiation
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
