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

    
    for(let i = 0; i < mappedCartItems; i++)
    
    
  
    return (
      <div className='shopping-list'>
        <h3>Shopping List</h3>
        {mappedCartItems}
      </div>
  )
}

export default CartList

