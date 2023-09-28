import React from 'react'
import {useLoaderData, useParams} from 'react-router-dom'
import CartItem from "./CartItem.jsx"

function CartList({ cart }){

    // do we even need this loader?? like what happens when the consumer logs back in? will the cart items from before load?
    const { cartItems } = useLoaderData()

    // a little funky here, cart items disappear on refresh 
    const mappedCartItems = cart.map(cartItem => (
      <CartItem 
        key={cartItem.id} cartItem={cartItem}
      />
    ))

    
    for(let i = 0; i < mappedCartItems; i++)
    
    
  
    return (
      <div className='shopping-list'>
        <h3>Shopping Cart</h3>
        {mappedCartItems}
        {/* use params to make the button go to new component */}
        <button> SEARCH STORES</button>
      </div>
  )
}

export default CartList

