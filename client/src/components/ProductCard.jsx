import { useState } from "react";


export default function ProductCard({ productObj, addCartItems }) {

  const [add, setAdd] = useState(false)

  function handleToggle(){
    setAdd(!add)
  }
    
    function handleAddToCart(e){        
        // e.preventDefault()
        const OPTIONS = { 
            method : "POST",
            headers : { 
                "Accept" : "application/json",
                "Content-type" : "application/json"
            },
            body : JSON.stringify({ 
                consumer_id: 1,
                product_id : productObj.id
            })
        } 
        fetch('/cart_items', OPTIONS)
        .then(response => response.json())
        .then(newCartItem => addCartItems(newCartItem))
    }

    
    return (
        <div className='product-card'>

          <div className='card-content'>
            <h3>{productObj.name}</h3>
            <img
              src={productObj.image}
              alt="product"
              className="product-image"
            />
          </div>
          <button onClick={handleToggle} className=" add-to-cart">
          {
            add ? 
            (<i className="fa-solid fa-minus" onClick={() => handleAddToCart()}></i>) 
            : 
            (<i className="fa-solid fa-plus " onClick={() => handleAddToCart()}></i>)
          }

          </button>
 
          



  
          {/* <button onClick={() => handleAddToCart()} className="add-to-cart">
            <span>Add to Cart</span>
          </button> */}
        </div>
      );
}


{/* <svg onClick={() => handleAddToCart} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
</svg> */}
