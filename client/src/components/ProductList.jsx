import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Search from './Search';

export default function ProductList() {


// filter and map here

  return (
    <div className="product-page">

      <div className="products-container">

      <Search />

      <div className="product-card-container">
        {/* this is where you place {filteredMappedCards} */}
      </div>

      </div>
      
    </div>
  );
}