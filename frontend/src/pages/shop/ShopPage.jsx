import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import ProductCards from "./ProductCards";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";

const filters = {
  categories: ["all", "tapes", "ropes"],
  colors: [
    "all",
    "black",
    "white",
    "red",
    "gold",
    "blue",
    "silver",
    "beige",
    "green",
    "yellow",
    "multi",
  ],
  priceRanges: [
    { label: "Under ₹50", min: 0, max: 50 },
    { label: "₹50 - ₹100", min: 50, max: 100 },
    { label: "₹100 - ₹200", min: 100, max: 200 },
    { label: "₹200 and above", min: 200, max: Infinity },
  ],
};

const ShopPage = () => {
  const navigate = useNavigate();
  const [filtersState, setFiltersState] = useState({
    category: "all",
    color: "all",
    priceRange: "",
    search: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [ProductsPerPage] = useState(8);
  const { category, color, priceRange, search } = filtersState;
  const [minPrice, maxPrice] = priceRange.split("-").map(Number);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const {
    data: { products = [], totalPages = 1, totalProducts = 0 } = {},
    error,
    isLoading,
  } = useFetchAllProductsQuery({
    category: category !== "all" ? category : "",
    color: color !== "all" ? color : "",
    minPrice: isNaN(minPrice) ? "" : minPrice,
    maxPrice: isNaN(maxPrice) ? "" : maxPrice,
    page: currentPage,
    limit: ProductsPerPage,
    search: search || "",
  });

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setFiltersState((prevState) => ({
      ...prevState,
      search: searchValue,
    }));

    if (searchValue) {
      const filteredSuggestions = products.filter((product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setSuggestions(filteredSuggestions.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (product) => {
    navigate(`/shop/${product._id}`);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFiltersState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFiltersState({
      category: "all",
      color: "all",
      priceRange: "",
      search: "",
    });
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (isLoading) return <div>Loading....</div>;
  if (error) return <div>Error loading products.</div>;

  const startProduct = (currentPage - 1) * ProductsPerPage + 1;
  const endProduct = startProduct + products.length - 1;

  return (
    <>
      <section className="section__container bg-rose-100">
        <h2 className="section__header capitalize">Shop Page</h2>
        <p className="section__subheader">
          The Ultimate Hold: Discover Our Premium Range of Tapes and Ropes Designed for Durability and Precision.
        </p>
      </section>

      <section className="section__container">
        <div className="flex flex-col md:flex-row md:gap-12 gap-8">
          <div className="flex flex-col gap-4 mb-4">
            <select name="category" value={category} onChange={handleFilterChange} className="border p-2 rounded-md">
              {filters.categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select name="color" value={color} onChange={handleFilterChange} className="border p-2 rounded-md">
              {filters.colors.map((col) => (
                <option key={col} value={col}>{col}</option>
              ))}
            </select>

            <select name="priceRange" value={priceRange} onChange={handleFilterChange} className="border p-2 rounded-md">
              <option value="">All Prices</option>
              {filters.priceRanges.map((range) => (
                <option key={range.label} value={`${range.min}-${range.max}`}>{range.label}</option>
              ))}
            </select>

            <button onClick={clearFilters} className="bg-red-500 text-white p-2 rounded-md">
              Clear Filters
            </button>
          </div>

          <div>
            <div className="mb-4 relative">
            <input
  type="text"
  placeholder="Search products..."
  value={filtersState.search}
  onChange={handleSearchChange}
  className="border p-3 rounded-md w-full md:w-196"
/>
              {showSuggestions && (
                <ul className="absolute bg-white border border-gray-300 mt-1 w-full z-10 rounded-md shadow-lg">
                  {suggestions.map((product) => (
                    <li
                      key={product._id}
                      onClick={() => handleSuggestionClick(product)}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                    >
                      {product.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <h3 className="text-xl font-medium mb-4">
              Showing {startProduct} to {endProduct} of {totalProducts} products
            </h3>
            <ProductCards products={products} />

            <div className="mt-6 flex justify-center">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
              >
                Previous
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;

