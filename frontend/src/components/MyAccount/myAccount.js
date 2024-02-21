import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER_INFO } from "../../graphql/mutations/getUserInfoQuery";
import { UPDATE_USER_LOCATION } from "../../graphql/mutations/updateUserLocationMutation";
import LocationModal from "./locationModal";

import Header from "../Header";
import "./myAccount.css";

const MyAccount = () => {
  const { loading, error, data } = useQuery(GET_USER_INFO);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [updateUserLocation] = useMutation(UPDATE_USER_LOCATION);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { username, email, location } = data.userInfo;

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const handleLocationFormSubmit = (newLocation) => {
    updateUserLocation({
      variables: { userId: data.userInfo.id, location: newLocation }
    }).then((result) => {
      setSuccessMessage('Location updated successfully!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000); // 3000 milliseconds = 3 seconds
    }).catch((error) => {
      setErrorMessage('Failed to update location.');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    });
  };

  return (
    <div>
      <Header hasSearchBar={false} />
      <div className="my-account-container">
        <h2>My Account</h2>
        <div className="user-info-myAccount">
          <div className="info-item-myAccount">
            <span className="label-title-myAccount">Username:</span> {username}
          </div>
          <div className="info-item-myAccount">
            <span className="label-title-myAccount">Email:</span> {email}
          </div>
          <div className="info-item-myAccount">
            <span className="label-title-myAccount">Location:</span>
            <div className="location-details-myAccount">
              <div><span>Country:</span> {location.country}</div>
              <div><span>State:</span> {location.state}</div>
              <div><span>City:</span> {location.city}</div>
              <div><span>Postal Code:</span> {location.postalCode}</div>
            </div>
            <button className="change-location-btn-myAccount" onClick={handleToggleModal}>Change Location</button>
          </div>
        </div>
        {showModal && <LocationModal onClose={handleToggleModal} onSubmit={handleLocationFormSubmit} />}
        {successMessage && <div className="success-message-myAccount">{successMessage}</div>}
        {errorMessage && <div className="error-message-myAccount">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default MyAccount;
