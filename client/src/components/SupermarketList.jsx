import React from "react";
import { useLoaderData } from "react-router-dom";
import SupermarketCard from "./SupermarketCard";

function SupermarketList() {

  const { supermarkets } = useLoaderData();

  const mappedSupermarketCards = supermarkets.map((supermarketObj) => (
    <SupermarketCard key={supermarketObj.id} supermarketObj={supermarketObj} />
  ));

  return (
    <div>
      <h1>Supermarket List</h1>
      <div className="supermarket-card-container">{mappedSupermarketCards}</div>
    </div>
  );
}

export default SupermarketList;
