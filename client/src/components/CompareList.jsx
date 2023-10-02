import {useLoaderData, useNavigate} from 'react-router-dom'
import CompareCard from './CompareCard'

function SearchStores() { 

    // LOADERS 
    const { cartItems } = useLoaderData()

    const navigate = useNavigate()

    function handleGoBack() {
        navigate('/products')
    }

    const mappedCartItems = cartItems.map(cartItem => (
        <CompareCard 
        key={cartItem.id} 
        cartItem={cartItem}
        />
    ))


// Inside your SearchStores component's return statement
// Inside your SearchStores component's return statement
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
        <div className="compare-price-total">Total price:</div>
      </div>
    </div>
  );
  
  
  
  
}
export default SearchStores
