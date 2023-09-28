export default function Search({setFilteredProducts}) {

    function handleSearch(e){ 
        setFilteredProducts(e.target.value)
    }
    
    return (
        <div className="search-bar">
            <label htmlFor="search">Search products:</label>
            <input
                type="text"
                id="search"
                placeholder="Search for a product..."
                onChange={handleSearch}
            />
            
        </div>
    )
}


