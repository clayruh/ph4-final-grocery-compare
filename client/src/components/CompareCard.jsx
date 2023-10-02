import React from 'react';

export default function CompareCard({ cartItem }) {
  const numericPrices = cartItem.product.prices.map((priceObj) => {
    const priceString = priceObj.price;
    const numericPrice = parseFloat(priceString.replace(/[^\d.]/g, ''));
    return numericPrice.toFixed(2);
  });

  const mapPrices = numericPrices.map((numericPrice, index) => (
    <div key={index} className="price-column">
      ${numericPrice}
    </div>
  ));
  

  return (
    <div className="compare-prices-item">
      {/* can we make the cards smaller? and somehow make the products scrollable? */}
      <div className="product-card">
        <div className="card-content">
          <h3>{cartItem.product.name}</h3>
          <img
            src={cartItem.product.image}
            alt={cartItem.product.name}
            className="product-image"
          />
        </div>
      </div>
      <div className="price-div">
        {mapPrices}
      </div>
    </div>
  );
}
