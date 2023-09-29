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

    return ( 
        <div>
            {/* <button onClick={handleGoBack}>Go back to products</button> */}
            <h2>Compare Stores</h2>
            <div className="compare-prices-container">
                {mappedCartItems}
            </div>
        </div>
    )
}
export default SearchStores