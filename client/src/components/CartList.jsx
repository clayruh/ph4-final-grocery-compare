import React from 'react'
import CartItem from "./CartItem.jsx"
import { useNavigate } from 'react-router-dom'

function CartList({ cart, setCart }){

    const navigate = useNavigate()  

    const mappedCartItems = cart.map(cartItem => (
      <CartItem 
        key={cartItem.id} 
        cartItem={cartItem}
        cart={cart}
        setCart={setCart}
      />
    ))

    function handleSearchStores(){ 
      navigate('/compare-stores')
    } 
  
    return (
      <div className='shopping-list'>
        <h3 className='cart-header'>Grocery List</h3>
        <button 
          className='search-stores' 
          onClick={handleSearchStores}
        >
          Search Stores
        </button>
        <div className='cart-items'>
          {mappedCartItems}
        </div>
      </div>
  )
}

export default CartList

