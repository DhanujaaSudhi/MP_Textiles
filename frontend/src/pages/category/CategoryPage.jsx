import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";
import ProductCards from "../shop/ProductCards";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch products from the API using Redux Toolkit Query
  const { data, isLoading, isError } = useFetchAllProductsQuery({
    category: categoryName.toLowerCase(),
  });

  useEffect(() => {
    if (data && data.products) {
      setFilteredProducts(data.products);
    }
  }, [data]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryName]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Failed to load products. Please try again later.</div>;
  }

  return (
    <>
      <section className="section__container bg-rose-100">
        <h2 className="section__header capitalize">{categoryName}</h2>
        <p className="section__subheader">
          Browse a diverse range of categories, from chic dresses to versatile
          accessories. Elevate your style today!
        </p>
      </section>

      {/* products card */}
      <div className="section__container">
        <ProductCards products={filteredProducts} />
      </div>
    </>
  );
};

export default CategoryPage;
