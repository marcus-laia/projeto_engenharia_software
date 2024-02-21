import React from 'react';
import './locationModal.css';

const LocationModal = ({ onClose, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const locationData = {
      country: formData.get('country'),
      state: formData.get('state'),
      city: formData.get('city'),
      postalCode: formData.get('postalCode')
    };
    onSubmit(locationData);
    onClose();
  };

  return (
    <div className="modal-overlay-locationModal" onClick={onClose}>
      <div className="modal-content-locationModal" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn-locationModal" onClick={onClose}>&times;</span>
        <h2>Change Location</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Country:
            <input type="text" name="country" />
          </label>
          <label>
            State:
            <input type="text" name="state" />
          </label>
          <label>
            City:
            <input type="text" name="city" />
          </label>
          <label>
            Postal Code:
            <input type="text" name="postalCode" />
          </label>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default LocationModal;
