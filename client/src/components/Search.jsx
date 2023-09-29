export default function Search({ setFilteredProducts }) {
  
  function handleSearch(e) {
    setFilteredProducts(e.target.value);
  }

  return (
    <div className="search-bar">

      <input
        type="text"
        id="search"
        placeholder="Search for a product..."
        onChange={handleSearch}
        className="search-input"
      />
    </div>
  );
}