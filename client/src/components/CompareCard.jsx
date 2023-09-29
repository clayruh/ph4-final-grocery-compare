export default function CompareCard({ cartItem }) {

    function loopPrices() {
        
    }

    return (
        <>
            <img
              src={cartItem.product.image}
              alt="product"
              className="product-image"
            />
            <p>Product: {cartItem.product.name}</p>
            {/* how to iterate through a list to get the price? */}
            <p>Price: {cartItem.product.prices[0].price}</p>
        </>
    )
}