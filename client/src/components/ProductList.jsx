import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import ProductCard from "./ProductCard.jsx";
import CartList from "./CartList";
import Search from "./Search";

export default function ProductList() {
  // LOADERS //
  const { allProducts, cartItems } = useLoaderData() || {};

  // STATES //
  const [filteredProducts, setFilteredProducts] = useState("");
  const [cart, setCart] = useState(cartItems);
  const [currentPage, setCurrentPage] = useState(0); // Current page (0-based index)
  const productsPerPage = 8; // Products to display per page
  const maxVisiblePages = 5; // Maximum number of visible pages

  // Filter products
  const filteredProductsList = allProducts.filter((product) => {
    return product.name.toLowerCase().includes(filteredProducts.toLowerCase());
  });

  // Calculate the number of pages
  let pageCount = 1;
  if (filteredProductsList.length > 0) {
    pageCount = Math.ceil(filteredProductsList.length / productsPerPage);
  }

  // Ensure currentPage is within valid range
  const validCurrentPage = Math.min(currentPage, pageCount - 1);

  // Get the products for the current page using slice
  const startIndex = validCurrentPage * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProductsList.slice(startIndex, endIndex);

  // Calculate the visible page numbers dynamically
  const visiblePages = Array.from(
    { length: Math.min(pageCount, maxVisiblePages) },
    (_, index) => index + Math.max(0, validCurrentPage - Math.floor(maxVisiblePages / 2))
  );

  function addCartItems(newCartItem) {
    setCart((prevCartItems) => [...prevCartItems, newCartItem]);
  }

  // Handle page change
  function handlePageChange(newPage) {
    setCurrentPage(newPage);
  }

  return (
    <>
      <div className="product-page">
        <div className="search">
          <Search setFilteredProducts={setFilteredProducts} />
        </div>
        <div className="content">
          <div className="product-list">
            <div className="products-container">
              {currentProducts.map((productObj) => (
                <ProductCard
                  key={productObj.id}
                  productObj={productObj}
                  addCartItems={addCartItems}
                />
              ))}
            </div>
          </div>
          <div className="cart-list">
            <CartList cart={cart} setCart={setCart} />
          </div>
        </div>
        <div className="pagination-container">
          <div className="pagination">
            {validCurrentPage > 0 && (
              <button onClick={() => handlePageChange(validCurrentPage - 1)}>
                {"<"}
              </button>
            )}
            {visiblePages.map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={page === validCurrentPage ? "active" : ""}
              >
                {page + 1}
              </button>
            ))}
            {validCurrentPage < pageCount - 1 && (
              <button onClick={() => handlePageChange(validCurrentPage + 1)}>
                {">"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

