import React from "react";

export default function SupermarketCard({ supermarketObj }) {
    
    return (
        <div>
            <h1>Supermarket Card</h1>
            <div className="supermarket-name">{supermarketObj.name}</div>
            <p className="supermarket-address">{supermarketObj.address}</p>
        </div>
    )
}

