import {
  Button,
  Card,
  Center,
  Container,
  Flex,
  Group,
  Text,
  Title,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import NoteToSelf from "../components/NoteToSelf";
import { useState } from "react";
import BuyOrRent from "../components/BuyOrRent";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [isProductClicked, setIsProductClicked] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(false);

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

  const handleProductCardClick = (product) => {
    setIsProductClicked(true);
    setCurrentProduct(product);
  };

  const handleCloseBuyRent = () => {
    setIsProductClicked(false);
    setCurrentProduct({});
    queryResults.refetch();
  };

  if (isProductClicked) {
    return <BuyOrRent product={currentProduct} onClose={handleCloseBuyRent} />;
  }

  return (
    <div>
      {/* // TODO */}
      <NoteToSelf />
      {/* // TODO */}
      <Flex m={"10px"} justify={"flex-end"}>
        <Button color="red" mr="10px" mt="10px" uppercase>
          Logout
        </Button>
      </Flex>
      <Container my={"xl"} py={"xl"} size={"lg"}>
        <Title ta="center" order={1} fw={400} mb={"60px"}>
          ALL PRODUCTS{" "}
        </Title>
        {!products ? (
          <Center mb={"xl"}>
            <Card my={"xl"} padding="xl" size={"xl"}>
              <Title order={3}>No products to display</Title>
            </Card>
          </Center>
        ) : (
          products.map((product) => {
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
                onClick={() => handleProductCardClick(product)}
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
          })
        )}
        <Group position="left">
          <Link to={`/my-products`}>
            <Button uppercase>My Products</Button>
          </Link>
        </Group>
      </Container>
    </div>
  );
};

export default AllProducts;
