export default function CompareCard({ cartItem }) {

    function loopPrices() {

    }

    return (
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
            {/* how to iterate through a list to get the price? */}
            <p>Price: {cartItem.product.prices[0].price}</p>
        </div>
    )
}