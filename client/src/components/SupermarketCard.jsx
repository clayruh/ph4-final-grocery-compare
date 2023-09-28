import React from "react";

export default function SupermarketCard({ supermarketObj }) {
    
    return (
        <div className="supermarket-card">
            <h3>{supermarketObj.name}</h3>
            <p className="supermarket-address">{supermarketObj.address}</p>
        </div>
    )
}

