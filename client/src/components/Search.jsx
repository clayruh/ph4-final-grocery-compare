export default function Search({setFilteredProducts}) {

    function handleSearch(e){ 
        setFilteredProducts(e.target.value)
    }
    
    return (
        <div className="search-bar">
            <label htmlFor="search">Search Products:</label>
            <input
                type="text"
                id="search"
                placeholder="Type a product to search..."
                onChange={handleSearch}
            />
            
        </div>
    )
}


