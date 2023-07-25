import { Container, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import BuyOrRent from "../components/productActions/BuyOrRent";
import NoProductsToDisplay from "../components/NoProductsToDisplay";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import fetchAllProducts from "../fetchData/fetchAllProducts";

const AllProducts = () => {
  const [isProductClicked, setIsProductClicked] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(false);

  const [userId, setUserId] = useState();

  let user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    setUserId(user.id);
  }, [user.id]);

  const queryResults = useQuery(
    ["allProducts"],
    () => fetchAllProducts(user.id),
    {
      staleTime: Infinity,
    }
  );

  const products = queryResults.data;

  if (queryResults.isLoading) {
    return <Loading />;
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
    return (
      <BuyOrRent
        product={currentProduct}
        onClose={handleCloseBuyRent}
        userId={userId}
      />
    );
  }

  return (
    <div>
      <Container my={"xl"} py={"xl"} size={"lg"}>
        <Title ta="center" order={1} fw={400} mb={"60px"}>
          ALL PRODUCTS{" "}
        </Title>
        {products.length === 0 ? (
          <NoProductsToDisplay text={"No products to display"} />
        ) : (
          products.map((product) => {
            return (
              <Container
                size={"lg"}
                key={product.id}
                sx={{
                  "&:hover": {},
                }}
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
