import { Button, Flex, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

const MyProducts = () => {
  const queryResults = useQuery(
    ["products"],
    async () => {
      const apiRes = await fetch(`http://localhost:3001/api/v1/products`);
      if (!apiRes.ok) {
        throw new Error(`products fetch not ok`);
      }
      return apiRes.json();
    },
    { staleTime: Infinity }
  );

  const { data } = queryResults;

  if (queryResults.isLoading) {
    return <div>...Loading</div>;
  }

  console.log(data);

  return (
    <div>
      <Flex m={"10px"} justify={"flex-end"}>
        <Button color="red" mr="10px" mt="10px" uppercase>
          Logout
        </Button>
      </Flex>
      <Title ta="center" order={1} fz={"xl"} fw={400}>
        MY PRODUCTS{" "}
      </Title>
    </div>
  );
};

export default MyProducts;
