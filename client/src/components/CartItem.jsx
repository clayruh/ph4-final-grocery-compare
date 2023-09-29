export default function CartItem({ cartItem, cart, setCart }) {
    
    function deleteCartItem(removedCartItem) {
        const filteredItems = cart.filter( item => item.id !== removedCartItem.id )
        setCart(filteredItems)
    }

    function handleRemove(cartItem) {
        console.log(cartItem)
        const OPTIONS = {method: 'DELETE'}
        fetch(`http://localhost:5555/cart_items/${cartItem.product_id}`, OPTIONS)
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok')
            }
            deleteCartItem(cartItem)
        })
        .catch(error => { console.error('Error:', error) })
    }

    return (
        <div className="cart-item">
            <p>Consumer id: {cartItem.consumer_id}</p>
            <div className="cart-item-details">
                <p>Product: {cartItem.product.name}</p>
                {/* I'm confused why passing in cartItem here makes it know about itself? */}
                <button className="remove-button" onClick={() => handleRemove(cartItem)}>Remove</button>
            </div>
        </div>
    )
}
