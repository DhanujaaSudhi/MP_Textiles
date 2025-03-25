import React, { useState } from "react";
import ProductCards from "./ProductCards";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";

const TrendingProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(8);

  // Fetch products from the backend API
  const {
    data: { products = [] } = {},
    isLoading,
    error,
  } = useFetchAllProductsQuery({});

  const loadMoreProducts = () => {
    setVisibleProducts((prevCount) => prevCount + 4);
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching trending products.</div>;
  return (
    <section className="section__container product__container">
      <h2 className="section__header">Trending Products</h2>
      <p className="section__subheader mb-12">
      Discover the Hottest Picks: Find the Perfect Tape and Rope for Any Project in Our Curated Collection of High-Quality Products.
      </p>

      {/* products card */}
      <div className="mt-12">
        <ProductCards products={products.slice(0, visibleProducts)} />
      </div>

      {/* load more products btn */}
      <div className="product__btn">
        {visibleProducts < products.length && (
          <button className="btn" onClick={loadMoreProducts}>
            Load More
          </button>
        )}
      </div>
    </section>
  );
};

export default TrendingProducts;
