import React, {useState} from 'react'
import {useLoaderData} from 'react-router-dom'
import CartCard from "./CartCard.jsx"


function CartList(){
    const {allCarts} = useLoaderData()

    
    return (
      <div>
        {allCarts.map((cartItem) => <CartCard key= {cartItem.id} cartItem={cartItem} />)}
      
      </div>
  )
}

export default CartList

