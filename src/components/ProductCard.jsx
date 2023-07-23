/* eslint-disable react/prop-types */
import { Card, Flex, Text, Title } from "@mantine/core";

const ProductCard = ({ product }) => {
  console.log(product);

  const formattedTitle =
    product.title.toLowerCase().charAt(0).toUpperCase() +
    product.title.slice(1);

  return (
    <div>
      <Card
        key={product.id}
        shadow="lg"
        my={"xl"}
        padding="lg"
        withBorder
        onClick={() => console.log("cardClick")}
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
                categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
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
    </div>
  );
};

export default ProductCard;
