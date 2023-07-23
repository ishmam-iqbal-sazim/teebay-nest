import {
  ActionIcon,
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
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import AddProduct from "../components/AddProduct";
import EditProduct from "../components/EditProduct";
import NoteToSelf from "../components/NoteToSelf";
import { Link } from "react-router-dom";

const MyProducts = () => {
  let userId = 1; // placeholder
  const [isAddProductClicked, setIsAddProductClicked] = useState(false);
  const [openEditProduct, setOpenEditProduct] = useState(false);
  const [productToEdit, setProductToEdit] = useState({});

  const queryResults = useQuery(
    [`user${userId}Products`],
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
    queryResults.refetch();
  };

  const handleProductCardClick = (product) => {
    setOpenEditProduct(true);
    setProductToEdit(product);
  };

  const handleEditProductClose = () => {
    setOpenEditProduct(false);
    setProductToEdit({});
    queryResults.refetch();
  };

  if (isAddProductClicked) {
    return <AddProduct onClose={handleAddProductClose} />;
  }

  if (openEditProduct) {
    return (
      <EditProduct onClose={handleEditProductClose} product={productToEdit} />
    );
  }

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
      {/* // TODO */}
      <NoteToSelf />
      {/* // TODO */}
      <Flex m={"10px"} justify={"flex-end"}>
        <Button color="red" mr="10px" mt="10px" uppercase>
          Logout
        </Button>
      </Flex>
      <Container my={"xl"} size={"lg"}>
        <Title ta="center" order={1} fw={400} mb={"60px"}>
          MY PRODUCTS{" "}
          <Group position="left">
            <Link to={`/all-products`}>
              <Button uppercase>All Products</Button>
            </Link>
            <Link to={`/my-transactions`}>
              <Button uppercase>My Transactions</Button>
            </Link>
          </Group>
        </Title>
        {products.length == 0 ? (
          <Center mb={"xl"}>
            <Card my={"xl"} padding="xl" size={"xl"}>
              <Title order={3}>You have no products</Title>
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
                  <ActionIcon
                    size={"lg"}
                    variant="transparent"
                    mx={"10px"}
                    onClick={(event) => {
                      event.stopPropagation();
                      // implement modal later
                      let productId = product.id;
                      handleDelete(productId);
                    }}
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
              </Card>
            );
          })
        )}
        <Group position="right">
          <Button color="violet" uppercase onClick={handleAddProductClick}>
            Add Product
          </Button>
        </Group>
      </Container>
    </div>
  );
};

export default MyProducts;
