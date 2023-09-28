export async function getProducts() {
    const productsResponse = await fetch('http://localhost:5555/products')
    const allProducts = await productsResponse.json()
    console.log(allProducts)
    return { allProducts }
}

export async function getSupermarketLoader() {
    const res = await fetch('http://localhost:5555/supermarkets')
    const allSupermarkets = await res.json()
    return { allSupermarkets }
}

export async function getCartItems() {
    const cartsResponse = await fetch('http://localhost:5555/cart_items/1')
    const cartItems = await cartsResponse.json()
    return { cartItems }
}