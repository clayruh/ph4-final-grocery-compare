import React from 'react'
import {useLoaderData} from 'react-router-dom'
import CartItem from "./CartItem.jsx"
import { Navigate } from 'react-router-dom'

function CartList({ cart }){

  // const Navigate() = navigate  

    // do we even need this loader?? like what happens when the consumer logs back in? will the cart items from before load?
    const { cartItems } = useLoaderData()

    // a little funky here, cart items disappear on refresh 
    const mappedCartItems = cart.map(cartItem => (
      <CartItem 
        key={cartItem.id} cartItem={cartItem}
      />
    ))

    function handleSearchStore(){ 
    
      console.log("lets checkout the stores!!!!!!!")
    }
  
    return (
      <div className='shopping-list'>
        <h3>Shopping Cart</h3>
        {mappedCartItems}
        {/* use params to make the button go to new component */}
        <button onClick={handleSearchStore(navigate => ('/SearchStores'))}>Search Stores</button>
      </div>
  )
}

export default CartList

