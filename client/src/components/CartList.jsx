import React from 'react'
import {useLoaderData} from 'react-router-dom'
import CartItem from "./CartItem.jsx"


function CartList(){

    const { allCartItems } = useLoaderData()

    const mappedCartItems = allCartItems?.map(cartItem => (
      <CartItem 
        key={cartItem.id} cartItem={cartItem}
      />
    ))
  
    return (
      <div className='shopping-list'>
        <h1> THIS IS THE  CART LIST COMPONENT BEING PULLED IN </h1>
        <button> SEARCH STORES</button>
        <h3>Shopping List</h3>
        {mappedCartItems}
      </div>
  )
}

export default CartList

