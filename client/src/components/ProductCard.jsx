export default function ProductCard({ image, name }) {

    function handleAddToCart(){
        console.log('added to cart')
    }
    
    return (
        <div className='product-card'>
            <img src={image}></img>
            <h1>{name}</h1>
            <button onClick={() => handleAddToCart()}>add to cart</button>
        </div>
    )
}