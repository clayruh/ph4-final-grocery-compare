import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import ProductCard from "./ProductCard.jsx"
import Search from './Search';

export default function ProductList() {
  const { allProducts } = useLoaderData()
  
  const mapProductCards = allProducts.map(productObj => (
    <ProductCard 
      key={productObj.id} 
      image={productObj.image}
      name={productObj.name}
    />
  ))

  return (
    <div className="product-page">
      <div className="search">
        <Search />
      </div>
      <div className="products-container">
        {mapProductCards}
      </div>
    </div>
  );
}
