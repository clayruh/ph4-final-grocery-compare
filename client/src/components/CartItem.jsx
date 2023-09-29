import React from "react";

export default function CartItem({ cartItem, cart, setCart }) {
  function deleteCartItem(removedCartItem) {
    const filteredItems = cart.filter((item) => item.id !== removedCartItem.id);
    setCart(filteredItems);
  }

  function handleRemove() {
    const OPTIONS = { method: "DELETE" };
    fetch(`http://localhost:5555/cart_items/${cartItem.product_id}`, OPTIONS)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        deleteCartItem(cartItem);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div>
      <div className="cart-item-details">
        <ul>
          <li className="item">{cartItem.product.name}</li>
        </ul>
        <button className="remove-button item" onClick={handleRemove}>
          Remove
        </button>
      </div>
    </div>
  );
}
