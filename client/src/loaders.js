export async function getProducts() {
    const productsResponse = await fetch('http://localhost:5555/products')
    const allProducts = await productsResponse.json()

    return { allProducts }
}