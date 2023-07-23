/* eslint-disable react/prop-types */
import { Center, Container } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";

const LentProducts = ({ userId }) => {
  const queryResults = useQuery(
    [`${userId}_LentProducts`],
    async () => {
      const apiRes = await fetch(`http://localhost:3001/api/v1/${userId}/lent`);
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

  return (
    <Container my={"xl"} py={"xl"} size={"lg"}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Container>
  );
};

export default LentProducts;
