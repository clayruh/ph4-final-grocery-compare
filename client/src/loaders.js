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
    const cartItemsResponse = await fetch(`http://localhost:5555/cart_items`)
    const allCartItems = await cartItemsResponse.json()
    return { allCartItems }
}

export async function getCarts() {
    const cartsResponse = await fetch('http://localhost:5555/cart_items:id')
    const cartItem = await cartsResponse.json()
    return { cartItem }
}