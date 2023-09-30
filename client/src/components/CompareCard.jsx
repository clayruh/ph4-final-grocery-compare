import React from 'react';

export default function CompareCard({ cartItem }) {
    const numericPrices = cartItem.product.prices.map((priceObj) => {
        const priceString = priceObj.price;
        const numericPrice = parseFloat(priceString.replace(/[^\d.]/g, ''));
        return numericPrice.toFixed(2); // Format numeric price with two decimal places
    });

    const mapPrices = numericPrices.map((numericPrice, index) => (
        <span key={index}>${numericPrice}</span>
    ));

  return (
    <div className="compare-prices-item">
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
            Price: {mapPrices}
        </div>
    </div>
  );
}
