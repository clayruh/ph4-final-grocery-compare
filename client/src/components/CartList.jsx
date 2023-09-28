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
        <h3>Shopping List</h3>
        {mappedCartItems}
        <h4> THIS IS THE LIST</h4>
      </div>
  )
}

export default CartList

