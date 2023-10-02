import {useLoaderData, useNavigate} from 'react-router-dom'
import CompareCard from './CompareCard'
import { useState } from 'react'

function SearchStores() { 

    // LOADERS 
    const { cartItems } = useLoaderData()

    const navigate = useNavigate()

    function handleGoBack() {
        navigate('/products')
    }

    // Create an object to store the total prices for each supermarket
    const totalPricesBySupermarket = {};

    // Calculate total prices for each supermarket based on the cartItems
    cartItems.forEach((cartItem) => {
        // Iterate through prices for each cart item
        cartItem.product.prices.forEach((priceObj) => {
            const { supermarket_id, price } = priceObj;
            const numericPrice = parseFloat(price.replace(/[^\d.]/g, ''));

            if (!totalPricesBySupermarket[supermarket_id]) {
                totalPricesBySupermarket[supermarket_id] = numericPrice;
            } else {
                totalPricesBySupermarket[supermarket_id] += numericPrice;
            }
        });
    });

    // Now, totalPricesBySupermarket contains the total prices for each supermarket
    console.log(totalPricesBySupermarket);

    const mappedCartItems = cartItems.map(cartItem => (
        <CompareCard 
        key={cartItem.id} 
        cartItem={cartItem}
        />
    ))


return (
    <div className="compare-cart">
      <h2>Compare Stores</h2>
      <div className="compare-prices-container">
        <div className="compare-prices-labels">
          <div className="label-column">
            <h4>Products:</h4>
          </div>
          <div className="label-column">
            <h4>Trader Joe's:</h4>
          </div>
          <div className="label-column">
            <h4>Erewhon:</h4>
          </div>
        </div>
        {mappedCartItems}
        <div className="compare-price-total">
            <h4>Total Prices:</h4>
                {cartItems[0].product.prices.map((priceObj) => {
                    const supermarket_name = priceObj.supermarket.name
                    const supermarket_id = priceObj.supermarket_id
                    const totalPrice = totalPricesBySupermarket[supermarket_id] || 0;
                    return (
                        <div className="supermarket-total-price" key={supermarket_id}>
                            {supermarket_name}: ${totalPrice.toFixed(2)}
                        </div>
                    );
                })}
        </div>
      </div>
    </div>
  );
  
}
export default SearchStores
