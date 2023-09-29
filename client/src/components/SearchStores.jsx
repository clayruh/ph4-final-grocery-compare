
import {useNavigate} from 'react-router-dom'

function SearchStores() { 

    const navigate = useNavigate()

    function handleGoBack() {
        navigate('/products')
    }

    return ( 
        <div>
            {/* <button onClick={handleGoBack}>Go back to products</button> */}
            <h2>Compare Stores</h2>
            
        </div>
    )
}
export default SearchStores