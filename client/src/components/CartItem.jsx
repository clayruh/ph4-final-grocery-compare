import React from 'react'

// this is out cart Item
const CartItem = ({cartItem}) => {

  function handleRemove(){

    
    console.log('removed item')
  }

  
  return (
    <>
    <p>Consumer id: {cartItem.consumer_id}</p>
    <ul>Products: 
      {/* make a for loop of all the product names and prices */}
      
        <li>{cartItem.product.name}</li>
        <button onClick={handleRemove}>Remove item</button>
    </ul>

    </>
  )
}

export default CartItem