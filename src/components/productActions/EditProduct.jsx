/* eslint-disable react/prop-types */
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Flex,
  MultiSelect,
  NumberInput,
  Select,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { GrClose } from "react-icons/gr";

const EditProduct = ({ product, onClose }) => {
  const userId = product.ownerId;

  const categories = [
    { label: "ELECTRONICS", value: "ELECTRONICS" },
    { label: "FURNITURE", value: "FURNITURE" },
    { label: "HOME APPLIANCES", value: "HOME APPLIANCES" },
    { label: "SPORTING GOODS", value: "SPORTING GOODS" },
    { label: "OUTDOOR", value: "OUTDOOR" },
    { label: "TOYS", value: "TOYS" },
  ];

  const productCategoriesArray = product.categories.map((category) => {
    return category.name;
  });

  let reshapedProduct = {
    title: product.title,
    description: product.description,
    purchase_price: product.purchase_price,
    rent_price: product.rent_price,
    rent_duration: product.rent_duration,
    categories: productCategoriesArray,
  };

  const form = useForm({
    initialValues: reshapedProduct,
  });

  const handleSubmit = async () => {
    try {
      const apiRes = await fetch(
        `http://localhost:3001/api/v1/${userId}/${product.id}/1`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form.values),
        }
      );

      if (!apiRes.ok) {
        console.error("Error updating product data");
        return;
      }

      alert("Product updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating product data:", error);
    }
  };

  return (
    <Flex justify="center" align="center" direction="column">
      <Box
        mx="auto"
        mt="lg"
        sx={{
          border: "1px rgba(118, 117, 117, 0.5) solid",
        }}
      >
        <form>
          <Flex justify={"flex-end"} m={"lg"}>
            <ActionIcon onClick={onClose}>
              <GrClose />
            </ActionIcon>
          </Flex>
          <Box>
            <TextInput
              mt={"md"}
              label="Select a title for your product"
              {...form.getInputProps("title")}
            />
          </Box>
          <Box>
            <MultiSelect
              data={categories}
              label="Select Categories"
              placeholder="Select a category"
              defaultValue={form.values.categories}
              {...form.getInputProps("category")}
            />
          </Box>
          <Box>
            <TextInput
              mt={"md"}
              label="Select Description"
              {...form.getInputProps("description")}
            />
          </Box>
          <NumberInput
            mt={"md"}
            label="Select Price"
            {...form.getInputProps("purchase_price")}
          />
          <Box>
            <Flex justify={"space-between"} align={"center"} mt={"lg"}>
              <NumberInput label="Rent" {...form.getInputProps("rent_price")} />
              <Select
                placeholder="Select option"
                defaultValue={form.values.rent_duration}
                data={[
                  { value: "daily", label: "Daily" },
                  { value: "hourly", label: "Hourly" },
                  { value: "weekly", label: "Weekly" },
                  { value: "monthly", label: "Monthly" },
                ]}
                {...form.getInputProps("rent_duration")}
              />
            </Flex>
          </Box>
          <Center>
            <Button mt="xl" type="button" onClick={handleSubmit}>
              Edit Product
            </Button>
          </Center>
        </form>
      </Box>
    </Flex>
  );
};

export default EditProduct;
