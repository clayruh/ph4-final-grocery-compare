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
        <>
            <div className="compare-cart">
                {/* <button onClick={handleGoBack}>Go back to products</button> */}
                <h2>Compare Stores</h2>
                <div className="compare-prices-container">
                    <div className="compare-prices-labels">
                        {/* should we get supermarkets manually or dynamically? */}
                        <h4>Products:</h4>
                        <h4>Trader Joe's</h4>
                        <h4>Erewhon</h4>
                    </div>
                    {mappedCartItems}
                    <div className="compare-price-total">
                        {/* have this div stuck to the bottom of page */}
                        {/* map the total prices from cartItems */}
                        Total price: 
                    </div>
                </div>
            </div>
        </>
    )
}
export default SearchStores
