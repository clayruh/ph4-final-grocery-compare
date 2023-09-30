import { useState } from "react";


export default function ProductCard({ productObj, addCartItems }) {

  const [add, setAdd] = useState(false)

  function handleToggle(){
    setAdd(!add)
  }
    
    function handleAddToCart(){        
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
        .then(newCartItem => {
          if (newCartItem.id) {
            addCartItems(newCartItem)
          }
        })
    }
    
    return (
        <div className='product-card'>

          <div className='card-content'>
            <h3>{productObj.name}</h3>
            <img
              src={productObj.image}
              alt={productObj.name}
              className="product-image"
            />
          </div>
          <button onClick={handleToggle} className=" add-to-cart icon-container">
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
