import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import ProductCard from "./ProductCard.jsx"
import Search from './Search';

export default function ProductList() {
  const { allProducts } = useLoaderData()  || {}
  console.log(allProducts)
  const [filteredProducts, setFilteredProducts] = useState("")

  const searchProducts = allProducts?.filter(product => { product.name.toLowerCase().includes(filteredProducts.toLowerCase())})
  
  const mapProductCards = searchProducts?.map(productObj => (
    <ProductCard 
      key={productObj.id} productObj={productObj}
    />
  ))

  return (
    <>
      <div className="product-page">
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
