export default function ProductCard({ productObj, addCartItems }) {
    
    function handleAddToCart(){        
        const OPTIONS = { 
            method : "POST",
            headers : { 
                "Accept" : "application/json",
                "Content-type" : "application/json"
            },
            body : JSON.stringify({ 
                consumer_id: 1,
                product_id : productObj.id
            })
        } 
        fetch('/cart_items', OPTIONS)
        .then(response => response.json())
        .then(newCartItem => addCartItems(newCartItem))
    }
    
    return (
        <div className='product-card'>

          <div className='card-content'>
            <h3>{productObj.name}</h3>
            <img
              src={productObj.image}
              alt="product"
              className="product-image"
            />
          </div>
          <button onClick={() => handleAddToCart()} className="add-to-cart">
            <span>Add to Cart</span>
          </button>
        </div>
      );
}
