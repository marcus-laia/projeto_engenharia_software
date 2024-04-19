import React from "react";
import Product from "./product";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../graphql/mutations/getProductsQuery";
import "./productList.css";

const ProductList = ({ filter }) => {
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { filter },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="product-list">
      {data.getProducts.map((product) => (
        <Product
          id={product.id}
          name={product.name}
          image={product.image}
          sku={product.sku}
        />
      ))}
    </div>
  );
};

export default ProductList;
