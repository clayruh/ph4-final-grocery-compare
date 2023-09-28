export default function ProductCard({ productObj }) {

    function handleAddToCart(){
        console.log('added to cart')
    }
    
    return (
        <div className='product-card'>
            <img src={productObj.image}></img>
            <h3>{productObj.name}</h3>
            <button onClick={() => handleAddToCart()}>add to cart</button>
        </div>
    )
}