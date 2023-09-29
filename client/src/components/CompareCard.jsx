export default function CompareCard({ cartItem }) {

    function loopPrices() {
<<<<<<< HEAD

=======
        
        for( let i = 0; i > cartItem.product.prices; i ++)
        return cartItem[i]
>>>>>>> a21728208a01ac15247f60062e4faac6a6199d22
    }
    loopPrices()
    return (
<<<<<<< HEAD
        <div className="compare-prices-item">
            <div className="product-card">
                <div className="card-content">
                    <h3>{cartItem.product.name}</h3>
                    <img
                    src={cartItem.product.image}
                    alt={cartItem.product.name}
                    className="product-image"
                    />
                </div>
            </div>
=======
        <>
            <img
            src={cartItem.product.image}
            alt="product"
            className="product-image"
            />
            <p>Product: {cartItem.product.name}</p>
>>>>>>> a21728208a01ac15247f60062e4faac6a6199d22
            {/* how to iterate through a list to get the price? */}
            
            <p>Price: {cartItem.product.prices[0].price}</p>
        </div>
    )
}