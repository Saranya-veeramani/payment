import React, { useState } from 'react';
import './PaymentPlan.css';
import image1 from './assets/image1.jpg';
import image2 from './assets/image2.jpg';
import image3 from './assets/image3.jpg';
import image4 from './assets/image4.jpg';
import image5 from './assets/image5.jpg';
import image6 from './assets/image6.jpg';
import image7 from './assets/image7.jpg';

const SubscriptionPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [paymentOptions, setPaymentOptions] = useState([
    { id: 1, name: 'UPI', selected: false },
    { id: 2, name: 'Credit Card', selected: false },
    { id: 3, name: 'Debit Card', selected: false },
  ]);

  const plans = [
    {
      name: 'Mobile',
      screens: 1,
      audioQuality: 'Stereo',
      videoQuality: 'HD (720p)',
      PremiumContent:"yes",
      price: 499,
      duration: '12 months',
      Adfree:'yes', 
      LiveTV:"yes",
      BeforeTV:"yes",
    },
    {
      name: 'Premium HD',
      screens: 2,
      audioQuality: 'Dolby 5.1',
      videoQuality: 'FHD (1080p)',
      PremiumContent:"yes",
      Device:"yes", 
      price: 999,
      duration: '12 months',
      Adfree:'yes', LiveTV:"yes",
      BeforeTV:"yes",
    },
    {
      name: 'Premium 4k',
      screens: 4,
      audioQuality: 'Dolby Atmos',
      videoQuality: 'UHD (2160p)',
      PremiumContent:"yes",
      Device:"yes",
      Adfree:'yes',
      price: 1999,
      duration: '12 months',
      LiveTV:"yes",
      BeforeTV:"yes",
    },
  ];

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
  };

  const handleApplyCoupon = () => {
    if (couponCode === 'DISCOUNT') {
      setDiscount(0.3); // 30% discount
    } else {
      setDiscount(0); // No discount
    }
  };

  const handleCouponCodeChange = (e) => {
    setCouponCode(e.target.value);
  };

  const handlePaymentOption = (optionId) => {
    const updatedOptions = paymentOptions.map((option) => {
      if (option.id === optionId) {
        return { ...option, selected: true };
      } else {
        return { ...option, selected: false };
      }
    });
    setPaymentOptions(updatedOptions);
  };

  const renderPlanCard = (plan) => {
    const isSelected = selectedPlan && selectedPlan.name === plan.name;
    const discountedPrice = plan.price - plan.price * discount;

    return (
      <div
        key={plan.name}
        className={`plan-card ${isSelected ? 'selected' : ''}`}
        onClick={() => handlePlanSelection(plan)}
      >
        <h3>{plan.name}</h3>
        <p>Price: ₹{discountedPrice}</p>
        <p>Duration: {plan.duration}</p>
      </div>
    );
  };

  const renderFeatureRow = (featureName) => {
    const isHighlighted = selectedPlan && selectedPlan[featureName];

    return (
      <tr key={featureName}>
        <td>{featureName}</td>
        {plans.map((plan) => (
          <td key={plan.name} className={isHighlighted ? 'highlighted' : ''}>
            {plan[featureName] ? '✓' : '✕'}
          </td>
        ))}
      </tr>
    );
  };

  const renderFeatureTable = () => {
    return (
      <div className="feature-table-container">
        <table className="feature-table">
          <thead>
            <tr>
              <th></th>
              {plans.map((plan) => (
                <th key={plan.name}>{plan.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="feature"></td>
              {plans.map((plan) => (
                <td
                  key={plan.name}
                  className={selectedPlan && selectedPlan.name === plan.name ? 'highlighted' : ''}
                >
                  {plan.name === selectedPlan?.name ? '✓' : '✕'}
                </td>
              ))}
            </tr>
            {renderFeatureRow('PremiumContent')}
            {renderFeatureRow('BeforeTV')}
            {renderFeatureRow('LiveTV')}
            {renderFeatureRow('Adfree')}
            {renderFeatureRow('Device')}
            {renderFeatureRow('videoQuality')}
            {renderFeatureRow('audioQuality')}
            {renderFeatureRow('screens')}
          </tbody>
        </table>
      </div>
    );
  };

  const getImageByIndex = (index) => {
    switch (index) {
      case 1:
        return image1;
      case 2:
        return image2;
      case 3:
        return image3;
      case 4:
        return image4;
      case 5:
        return image5;
      case 6:
        return image6;
      case 7:
        return image7;
      default:
        return null;
    }
  };

  const renderPaymentOptions = () => {
    return (
      <div className="payment-options">
        <h4>Select Payment Option:</h4>
        {paymentOptions.map((option) => (
          <button
            key={option.id}
            className={option.selected ? 'selected' : ''}
            onClick={() => handlePaymentOption(option.id)}
          >
            {option.name}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="subscription-container">
      <div className="background-images">
        {[1, 2, 3, 4, 5, 6, 7].map((index) => (
          <div
            key={index}
            className={`background-image image-${index}`}
            style={{ backgroundImage: `url(${getImageByIndex(index)})` }}
          />
        ))}
      </div>
      <div className="content-container">
        <h2>Choose your Premium plan</h2>
        {renderFeatureTable()}
        <div className="plan-container">
          {plans.map((plan) => renderPlanCard(plan))}
        </div>
        {selectedPlan && (
          <div className="selected-plan-card">
            <h3>{selectedPlan.name}</h3>
            <p>Price: ₹{selectedPlan.price - selectedPlan.price * discount}</p>
            <p>Duration: {selectedPlan.duration}</p>
          </div>
        )}
        <div className="coupon-container">
          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={handleCouponCodeChange}
          />
          <button onClick={handleApplyCoupon}>Apply Code</button>
        </div>
        {renderPaymentOptions()}
        <div className="buy-container">
          {selectedPlan && (
            <div>
              <p>
                Selected plan: {selectedPlan.name} (₹
                {selectedPlan.price - selectedPlan.price * discount})
              </p>
              <button>Pay using {paymentOptions.find((option) => option.selected)?.name}</button>
              <button>Buy Premium</button>
            </div>
          )}
        </div>
      </div>
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
        <div className="footer-links">
          <a href="#">About Us</a>
          <a href="#">Help Center</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
        </div>
        <div className="consent-settings">
          <a href="#">Consent Settings</a>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
