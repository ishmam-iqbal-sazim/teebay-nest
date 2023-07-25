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

const EditProduct = ({ product, onClose, categories }) => {
  const userId = product.ownerId;

  // get current categories of product
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
    validateInputOnChange: true,
    initialValues: reshapedProduct,
    validate: {
      title: (value) => (value.length === 0 ? "Title is required." : null),
      purchase_price: (value) =>
        value.length === "" ? "Purchase price field is required" : null,
      rent_price: (value) =>
        value.length === "" ? "Rent price field is required" : null,
      rent_duration: (value) =>
        value.length === "" ? "Rent duration field is required" : null,
    },
  });

  const handleConfirmEdit = async (values) => {
    try {
      const apiRes = await fetch(
        `http://localhost:3001/api/v1/${userId}/${product.id}/1`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!apiRes.ok) {
        console.error("Error updating product data");
        return;
      }

      onClose();
    } catch (error) {
      console.error("Error updating product data:", error);
    }
  };

  return (
    <Flex
      justify="center"
      align="center"
      direction="column"
      style={{ minHeight: "100vh" }}
    >
      <Box
        maw={520}
        mx="auto"
        mt="lg"
        px={"50px"}
        py={"20px"}
        sx={{
          border: "1px rgba(118, 117, 117, 0.5) solid",
        }}
      >
        <form onSubmit={form.onSubmit((values) => handleConfirmEdit(values))}>
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
            <Button mt="xl" type="submit">
              Edit Product
            </Button>
          </Center>
        </form>
      </Box>
    </Flex>
  );
};

export default EditProduct;
