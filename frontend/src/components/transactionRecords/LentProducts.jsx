/* eslint-disable react/prop-types */
import { Container } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../ProductCard";
import Loading from "../Loading";
import NoProductsToDisplay from "../NoProductsToDisplay";
import fetchTransactionRecords from "../../data/fetchTransactionRecords";

const LentProducts = ({ userId }) => {
  const queryResults = useQuery(
    [`${userId}_LentProducts`],
    () => fetchTransactionRecords(userId, "LENT"),
    { staleTime: 0 }
  );

  let products = queryResults.data;

  if (products) {
    const replaceUnderscores = (categories) => {
      return categories.map((category) => category.replace(/_/g, " "));
    };

    products = products.map((product) => ({
      ...product,
      categories: replaceUnderscores(product.categories),
    }));
  }

  if (queryResults.isLoading) {
    return <Loading />;
  }

  return (
    <Container my={"xl"} py={"xl"} size={"lg"}>
      {!products || products.length == 0 ? (
        <NoProductsToDisplay text={"No lent products"} />
      ) : (
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            rentalPeriod={product.transactions[0]}
          />
        ))
      )}
    </Container>
  );
};

export default LentProducts;
