import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import ProductCard from "./ProductCard.jsx"
import Search from './Search';

export default function ProductListList() {

// filter and map here

  return (
    <div className="product-page">

      <div className="products-container">

      <Search />

      <div className="product-card-container">
        <ProductCard />
      </div>

      </div>
      
    </div>
  );
}
