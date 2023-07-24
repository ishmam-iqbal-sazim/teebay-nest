/* eslint-disable react/prop-types */
import { Button, Container, Group, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import AddProduct from "../components/productActions/AddProduct";
import EditProduct from "../components/productActions/EditProduct";
import Loading from "../components/Loading";
import ProductDelete from "../components/DeleteIcon";
import NoProductsToDisplay from "../components/NoProductsToDisplay";
import ProductCard from "../components/ProductCard";

let user = JSON.parse(localStorage.getItem("currentUser"));

const MyProducts = () => {
  let userId = user.id;

  const [isAddProductClicked, setIsAddProductClicked] = useState(false);
  const [openEditProduct, setOpenEditProduct] = useState(false);
  const [productToEdit, setProductToEdit] = useState({});

  const queryResults = useQuery(
    [`userProducts`],
    async () => {
      const apiRes = await fetch(
        `http://localhost:3001/api/v1/${userId}/products`
      );
      if (!apiRes.ok) {
        throw new Error(`products fetch not ok`);
      }
      return apiRes.json();
    },
    { staleTime: Infinity },
    { enabled: !!userId }
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

  if (queryResults.isLoading) {
    return <Loading />;
  }

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
      <Container my="xl" size={"xl"}>
        <Title ta="center" order={1} fw={400} mb={"60px"}>
          MY PRODUCTS{" "}
        </Title>
        {products.length == 0 ? (
          <NoProductsToDisplay text={"You have no products"} />
        ) : (
          products.map((product) => {
            return (
              <Container
                size={"xl"}
                key={product.id}
                onClick={() => handleProductCardClick(product)}
              >
                <ProductCard
                  product={product}
                  deleteIcon={
                    <ProductDelete onDelete={handleDelete} id={product.id} />
                  }
                />
              </Container>
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
