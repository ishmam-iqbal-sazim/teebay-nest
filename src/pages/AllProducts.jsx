import { Center, Container, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import BuyOrRent from "../components/productActions/BuyOrRent";
import NoProductsToDisplay from "../components/NoProductsToDisplay";
import ProductCard from "../components/ProductCard";

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
      <Container my={"xl"} size={"lg"}>
        <Title ta="center" order={1} fw={400} mb={"60px"}>
          ALL PRODUCTS{" "}
        </Title>
        {!products ? (
          <NoProductsToDisplay text={"No products to display"} />
        ) : (
          products.map((product) => {
            return (
              <Container
                size={"lg"}
                key={product.id}
                onClick={() => handleProductCardClick(product)}
              >
                <ProductCard product={product} />
              </Container>
            );
          })
        )}
      </Container>
    </div>
  );
};

export default AllProducts;
