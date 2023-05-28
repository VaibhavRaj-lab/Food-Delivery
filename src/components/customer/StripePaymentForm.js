import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';


const StripePaymentForm = ({ cartItems, totalPrice }) => {
  console.log(cartItems)
  const handleCheckout = async () => {
    try {
      // Replace 'YOUR_SERVER_ENDPOINT' with your actual server 
      const response = await axios.post('http://localhost:5001/checkout', {
        items: cartItems,
        totalPrice: totalPrice,
      });

      // Redirect the user to the Stripe Checkout page
      window.location.href = response.data.redirectUrl;
    } catch (error) {
      // Handle error
      console.error('Error during checkout:', error);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-summary">
          <h2 className="checkout-title">Order Summary</h2>
          <div className="checkout-items">
            {cartItems.map((item) => (
              <div key={item.id} className="checkout-item">
                <img src={item.image} alt={item.name} className="checkout-item-image" />
                <div className="checkout-item-details">
                  <p className="checkout-item-name">{item.name}</p>
                  <p className="checkout-item-price">₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="checkout-total">
            <p className="checkout-total-label">Total:</p>
            <p className="checkout-total-price">₹{totalPrice}</p>
          </div>
        </div>
        <div className="checkout-payment">
          <button className="checkout-button" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );

};

export default StripePaymentForm;
