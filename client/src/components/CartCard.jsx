import React from 'react'

const CartCard = ({cartItem}) => {
  return (
    <>
    <p>Consumer id: {cartItem.consumer_id}</p>
    <ul>Products: 
      {/* make a for loop of all the product names and prices */}
        <li>{cartItem.product.name}</li>
    </ul>

    </>
  )
}

export default CartCard