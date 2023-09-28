export async function getProducts() {
    const productsResponse = await fetch('http://localhost:5555/products')
    const allProducts = await productsResponse.json()

    return { allProducts }
}

export async function getSupermarketLoader() {
    const res = await fetch('http://localhost:555/supermarkets')
    const supermarkets = await res.json()
    return { supermarkets }
}
export async function getCarts() {
    const cartsResponse = await fetch('http://localhost:555/get_cart:id')
    const allCarts = await cartsResponse.json()
    return { allCarts }
}