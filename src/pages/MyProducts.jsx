/* eslint-disable react/prop-types */
import { Box, Button, Container, Group, Modal, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import AddProduct from "../components/productActions/AddProduct";
import EditProduct from "../components/productActions/EditProduct";
import Loading from "../components/Loading";
import ProductDelete from "../components/DeleteIcon";
import NoProductsToDisplay from "../components/NoProductsToDisplay";
import ProductCard from "../components/ProductCard";
import { useDisclosure } from "@mantine/hooks";
import NotLoggedIn from "../components/NotLoggedIn";

const MyProducts = () => {
  const [isAddProductClicked, setIsAddProductClicked] = useState(false);
  const [openEditProduct, setOpenEditProduct] = useState(false);
  const [productToEdit, setProductToEdit] = useState({});
  const [opened, { open, close }] = useDisclosure(false);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("currentUser")));
  }, []);

  let userId = user?.id;

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

  if (!userId) {
    return <NotLoggedIn />;
  }

  if (queryResults.isLoading) {
    return <Loading />;
  }

  if (isAddProductClicked) {
    return <AddProduct onClose={handleAddProductClose} userId={user.id} />;
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
      close();
      queryResults.refetch();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <Container my="xl" py={"xl"} size={"xl"}>
        <Title ta="center" order={1} fw={400} mb={"60px"}>
          MY PRODUCTS{" "}
        </Title>
        {products.length == 0 ? (
          <NoProductsToDisplay text={"You have no products"} />
        ) : (
          products.map((product) => {
            return (
              <Box
                key={product.id}
                styles={{ "&:hover": { cursor: "pointer" } }}
              >
                <Container
                  size={"xl"}
                  onClick={() => handleProductCardClick(product)}
                >
                  <ProductCard
                    product={product}
                    deleteIcon={
                      <ProductDelete onDelete={() => open()} id={product.id} />
                    }
                  />
                </Container>
                <Modal opened={opened} onClose={close} centered padding={"xl"}>
                  <Title order={2} fw={300}>
                    Are you sure you want to delete this Product?
                  </Title>
                  <Group position="right" spacing={"lg"} mt={"5rem"}>
                    <Button uppercase onClick={close} color="red">
                      No
                    </Button>
                    <Button
                      uppercase
                      color="violet"
                      onClick={() => handleDelete(product.id)}
                    >
                      Yes
                    </Button>
                  </Group>
                </Modal>
              </Box>
            );
          })
        )}
        <Group position="right">
          <Button
            color="violet"
            uppercase
            onClick={handleAddProductClick}
            m={"lg"}
          >
            Add Product
          </Button>
        </Group>
      </Container>
    </div>
  );
};

export default MyProducts;
