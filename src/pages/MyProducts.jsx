import {
  ActionIcon,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Text,
  Title,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import AddProduct from "../components/AddProduct";

const MyProducts = () => {
  let userId = 1; // placeholder
  const [isAddProductClicked, setIsAddProductClicked] = useState(false);

  const queryResults = useQuery(
    ["products"],
    async () => {
      const apiRes = await fetch(
        `http://localhost:3001/api/v1/${userId}/products`
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

  const handleAddProductClick = () => {
    setIsAddProductClicked(true);
  };

  const handleAddProductClose = () => {
    setIsAddProductClicked(false);
  };

  if (isAddProductClicked) {
    return <AddProduct onClose={handleAddProductClose} />;
  }

  if (isAddProductClicked) {
    return <AddProduct />;
  }

  console.log(products);

  const handleDelete = async (productId) => {
    try {
      const apiRes = await fetch(
        `http://localhost:3001/api/v1/${userId}/${productId}/2`,
        {
          method: "DELETE",
        }
      );

      if (!apiRes.ok) {
        console.error("Error deleting product");
        return;
      }
      // refetch products
      queryResults.refetch();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <Flex m={"10px"} justify={"flex-end"}>
        <Button color="red" mr="10px" mt="10px" uppercase>
          Logout
        </Button>
      </Flex>
      <Container my={"40px"} size={"lg"}>
        <Title ta="center" order={1} fw={400} mb={"60px"}>
          MY PRODUCTS{" "}
        </Title>
        {products.map((product) => {
          const formattedTitle =
            product.title.toLowerCase().charAt(0).toUpperCase() +
            product.title.slice(1);
          return (
            <Box key={product.id} my="40px">
              <Flex justify={"space-between"} my={"20px"}>
                <Title>{formattedTitle}</Title>
                <ActionIcon
                  size={"lg"}
                  variant="transparent"
                  mx={"10px"}
                  onClick={() => handleDelete(product.id)}
                >
                  <FaTrash size={30} color="black" />
                </ActionIcon>
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
            </Box>
          );
        })}
        <Flex justify={"flex-end"}>
          <Button
            color="violet"
            mb="50px"
            mt={"30px"}
            uppercase
            onClick={handleAddProductClick}
          >
            Add Product
          </Button>
        </Flex>
      </Container>
    </div>
  );
};

export default MyProducts;
