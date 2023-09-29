import React from 'react'

// this is out cart Item
const CartItem = ({cartItem}) => {

  function handleRemove(){
    // use the 'delete' route from the backend
    console.log('removed item')
  }

  function handleSearchStore(){ 

    console.log("lets checkout the stores!!!!!!!")
  }


  return (
    <>
      <p>Consumer id: {cartItem.consumer_id}</p>
        <ul>Products: 
      {/* make a for loop of all the product names and prices */}




          <li>{cartItem.product.name}</li>
          <button onClick={handleRemove}>Remove item</button>
          <button onClick={handleSearchStore(navigate => ('/SearchStores'))}></button>
        </ul>

    </>
  )
}

export default CartItem