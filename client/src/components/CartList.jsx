import React from 'react'
import React, {useState} from 'react'
import {userLoaderData} from 'react-router-dom'
import CartCart from "./CartCard.jsx"

import React from 'react'

function CartList(){
    const {allCarts} = useLoaderData 

    cartItems = allCarts.map((cartItem) => <CartCard key= {cartItem.id}/>)
  return (
    <div>CartList</div>
  )
}

export default CartList

