import React from 'react'

const CartCard = ({cartItem}) => {
  return (
    <>
    <div>{cartItem.consumer_id}</div>
    <div>{cartItem.product_id}</div>
    </>
  )
}

export default CartCard