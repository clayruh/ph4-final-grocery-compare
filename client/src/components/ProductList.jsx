import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import ProductCard from "./ProductCard.jsx"
import CartList from './CartList'
import Search from './Search';

export default function ProductList() {
  // LOADER //
  const { allProducts } = useLoaderData() || {}

  // STATES //
  const [filteredProducts, setFilteredProducts] = useState("")
  const [cart, setCart] = useState([])

  const searchProducts = allProducts?.filter(product => { 
    return product.name.toLowerCase().includes(filteredProducts.toLowerCase())})
  
  const mapProductCards = searchProducts?.map(productObj => (
    <ProductCard 
      key={productObj.id} 
      productObj={productObj}
      addCartItems={addCartItems}
    />
  ))

  function addCartItems(newCartItem) {
    setCart(prevCartItems => [...prevCartItems, newCartItem])
  }

  return (
    <>
      <div className="product-page">
        <div className="cart-list">
          <CartList cart={cart}/>
        </div>
        <div className="search">
          <Search setFilteredProducts={setFilteredProducts} />
        </div>
        <div className="products-container">
          {mapProductCards}
        </div>
      </div>
    </>
  );
}
