/* eslint-disable react/prop-types */
import { Center, Container } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";

const BoughtProducts = ({ userId }) => {
  const queryResults = useQuery(
    [`${userId}_BoughtProducts`],
    async () => {
      const apiRes = await fetch(
        `http://localhost:3001/api/v1/${userId}/bought`
      );
      if (!apiRes.ok) {
        throw new Error(`products fetch not ok`);
      }
      return apiRes.json();
    },
    { staleTime: Infinity }
  );

  const products = queryResults.data;

  if (queryResults.isLoading) {
    return <Center>...Loading</Center>;
  }

  console.log(products);

  return (
    <Container my={"xl"} py={"xl"} size={"lg"}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Container>
  );
};

export default BoughtProducts;
