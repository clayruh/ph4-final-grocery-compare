export async function getProducts() {
    const productsResponse = await fetch('http://localhost:5555/products')
    const allProducts = await productsResponse.json()
    return { allProducts }
}

export async function getSupermarkets() {
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
    const cartsResponse = await fetch('http://localhost:555/get_cart:id')
    const allCarts = await cartsResponse.json()
    return { allCarts }
}