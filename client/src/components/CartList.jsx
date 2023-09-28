import React, {useState} from 'react'
import {useLoaderData} from 'react-router-dom'
import CartCard from "./CartCard.jsx"


function CartList(){
    const { allCartItems } = useLoaderData()

    const mappedCartItems = allCartItems.map(cartItem => (
      <CartCard 
        key={cartItem.id} cartItem={cartItem}
      />
    ))
    
    return (
      <div>
        {mappedCartItems}
      </div>
  )
}

export default CartList

