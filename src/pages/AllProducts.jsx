import {
  Button,
  Card,
  Center,
  Container,
  Flex,
  Text,
  Title,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

const AllProducts = () => {
  const queryResults = useQuery(
    ["allProducts"],
    async () => {
      const apiRes = await fetch(`http://localhost:3001/api/v1/products`);
      if (!apiRes.ok) {
        throw new Error(`products fetch not ok`);
      }
      return apiRes.json();
    },
    { staleTime: Infinity }
  );

  const products = queryResults.data;

  console.log(products);

  if (queryResults.isLoading) {
    return <Center>...Loading</Center>;
  }

  return (
    <div>
      <Flex m={"10px"} justify={"flex-end"}>
        <Button color="red" mr="10px" mt="10px" uppercase>
          Logout
        </Button>
      </Flex>
      <Container my={"xl"} py={"xl"} size={"lg"}>
        <Title ta="center" order={1} fw={400} mb={"60px"}>
          ALL PRODUCTS{" "}
        </Title>
        {products.map((product) => {
          const formattedTitle =
            product.title.toLowerCase().charAt(0).toUpperCase() +
            product.title.slice(1);
          return (
            <Card
              key={product.id}
              shadow="xs"
              my={"xl"}
              padding="lg"
              withBorder
              onClick={() => alert(`Hello I am ${product.title}`)}
            >
              <Flex justify={"space-between"} my={"20px"}>
                <Title>{formattedTitle}</Title>
              </Flex>
              <Text>
                Categories:{" "}
                {product.categories
                  .map((category) => {
                    const categoryName = category.name.toLowerCase();
                    return (
                      categoryName.charAt(0).toUpperCase() +
                      categoryName.slice(1)
                    );
                  })
                  .join(", ")}
              </Text>
              <Text>
                {product.purchase_price} | Rent: $
                {`${product.rent_price} ${product.rent_duration}`}
              </Text>
              <Text>{product.description}</Text>
              <Flex justify={"space-between"}>
                <Text>Date posted: 21 July 2023</Text>
                <Text>134141 views</Text>
              </Flex>
            </Card>
          );
        })}
      </Container>
    </div>
  );
};

export default AllProducts;
