import React from 'react'

// this is out cart Item
const CartItem = ({cartItem}) => {

  function handleRemove(){
    // use the 'delete' route from the backend
    // use the 'delete' route from the backend
    console.log('removed item')
  }

  function handleSearchStore(){ 
    
    console.log("lets checkout the stores!!!!!!!")
  }



  return (
    <>
    {/* make a for loop of all the product names and prices */}
   
    <div>
      <div className = 'cart-item-details'>
        <ul>
          <li className ='item'>{cartItem.product.name}</li>
        </ul>
        <button className ='remove-button item' onClick={handleRemove}>Remove</button>
          {/* <button onClick={handleSearchStore(navigate => ('/SearchStores'))}></button> */}
      </div>
    </div>
    </>
  )
}

export default CartItem