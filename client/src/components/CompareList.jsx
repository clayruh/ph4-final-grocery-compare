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

          <h2>Compare Stores</h2>
        
              <h4>Products:</h4>
              <h4>Trader Joe's:</h4>
              <h4>Erewhon:</h4>
            
              {mappedCartItems}
            
              Total price:

        </div>
         
    
      
      );
    }
  
       
export default SearchStores




// return (
//   <>
//     <div className="compare-cart">
//       <h2>Compare Stores</h2>
//       <div className="compare-prices-container">
//         <div className="compare-prices-labels">
//           <h4>Products:</h4>
//           <h4>Trader Joe's:</h4>
//           <h4>Erewhon:</h4>
//         </div>
//         <div className="compare-prices-items">
//           {mappedCartItems}
//         </div>
//         <div className="compare-price-total">
//           Total price:
//         </div>
//       </div>
//     </div>
//   </>
// );