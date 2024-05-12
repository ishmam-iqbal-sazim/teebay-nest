/* eslint-disable react/prop-types */
import { Card, Flex, Text, Title } from "@mantine/core";

const ProductCard = ({ product, deleteIcon, rentalPeriod }) => {
  console.log(product);
  const formattedTitle =
    product.title.toLowerCase().charAt(0).toUpperCase() +
    product.title.slice(1);

  return (
    <div>
      <Card
        key={product.id}
        sx={{
          border: "2px rgba(162, 160, 160, 0.412) solid",
        }}
        p={30}
        fw={600}
        my={"xl"}
        radius={"sm"}
        padding="xl"
      >
        <Flex justify={"space-between"} my={"20px"}>
          <Title fw={500}>{formattedTitle}</Title>
          {deleteIcon && deleteIcon}
        </Flex>
        <Text my={5} c={"dimmed"}>
          Categories:{" "}
          {product.categories
            .map((category) => {
              const categoryName = category.toLowerCase();
              return (
                categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
              );
            })
            .join(", ")}
        </Text>
        <Text my={5} c={"dimmed"}>
          {product.purchasePrice} | Rent: $
          {`${product.rentPrice} ${product.rentDuration.toUpperCase()}`}
        </Text>
        <Text my={10}>{product.description}</Text>
        {rentalPeriod && (
          <Text>{`Rental Period: ${rentalPeriod.rentalStart} to ${rentalPeriod.rentalEnd}`}</Text>
        )}
        <Flex justify={"space-between"}>
          <Text c={"dimmed"}>Date posted: 21 July 2023</Text>
          <Text c={"dimmed"}>134141 views</Text>
        </Flex>
      </Card>
    </div>
  );
};

export default ProductCard;
