// export async function getProducts() {
//     return {}
// }


export async function getSupermarketLoader() {
    const res = await fetch('http://localhost:555/supermarkets')
    const supermarkets = await res.json()
    return { supermarkets}
}