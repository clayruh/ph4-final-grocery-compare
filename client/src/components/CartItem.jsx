import React from 'react'

// this is out cart Item
const CartItem = ({cartItem}) => {

  function handleRemove(){
    // use the 'delete' route from the backend
    console.log('removed item')
  }
  
  return (
    <>
    <p>Consumer id: {cartItem.consumer_id}</p>
    <p>Product: {cartItem.product.name}</p>
        <button onClick={handleRemove}>Remove item</button>
    </>
  )
}

export default CartItem