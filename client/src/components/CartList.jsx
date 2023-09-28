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
        <h1 className = 'temporary'> THIS IS THE  CART LIST COMPONENT BEING PULLED IN </h1>
        <h1>Shopping List</h1>
        <button> SEARCH STORES</button>
        {mappedCartItems}


        <h2 className = 'temporary'> This box will populate with the clicked items</h2>
      </div>
  )
}

export default CartList

