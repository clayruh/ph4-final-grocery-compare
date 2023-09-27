export default function ProductCard({ image, name }) {

    function handleAddToCart(){
        console.log('added to cart')
    }
    
    return (
        <div className='product-card'>
            <img src={image}></img>
            <h3>{name}</h3>
            <button onClick={() => handleAddToCart()}>add to cart</button>
        </div>
    )
}