import { useState } from "react";


export default function ProductCard({ productObj, addCartItems, cart, setCart }) {

  const [add, setAdd] = useState(false)

  function handleToggle(){
    setAdd(!add)
  }
    
  function handleAddToCart() {        
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

  function deleteCartItem(removedCartItem) {
    const filteredItems = cart.filter((item) => item.id !== removedCartItem.id);
    setCart(filteredItems);
  }

  function handleRemoveCart() {
    const OPTIONS = { method: "DELETE" };
    fetch(`http://localhost:5555/cart_items/${productObj.product_id}`, OPTIONS)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        deleteCartItem(productObj);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
            // in order to have this update dynamically, we need another attribute on the backend that holds whether the state of "in-cart" is true or false
            (<i className="fa-solid fa-minus" onClick={() => handleAddToCart()}></i>) 
            : 
            (<i className="fa-solid fa-plus " onClick={() => handleAddToCart()}></i>)
          }

          </button>
 
        </div>
      );
}
