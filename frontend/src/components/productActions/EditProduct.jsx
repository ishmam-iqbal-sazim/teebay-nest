/* eslint-disable react/prop-types */
import {
  Button,
  Center,
  Grid,
  Group,
  MultiSelect,
  NumberInput,
  Select,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";

const EditProduct = ({ product, onClose, categories }) => {
  // TODO Reusable input/form componennts
  const userId = product.user;

  // get current categories of product
  const productCategoriesArray = product.categories.map((category) => {
    return category;
  });

  let reshapedProduct = {
    title: product.title,
    description: product.description,
    purchasePrice: product.purchasePrice,
    rentPrice: product.rentPrice,
    rentDuration: product.rentDuration,
    categories: productCategoriesArray,
  };

  const form = useForm({
    validateInputOnChange: true,
    initialValues: reshapedProduct,
    validate: {
      title: (value) => (value.length === 0 ? "Title is required." : null),
      purchasePrice: (value) =>
        value.length === "" ? "Purchase price field is required" : null,
      rentPrice: (value) =>
        value.length === "" ? "Rent price field is required" : null,
      rentDuration: (value) =>
        value.length === "" ? "Rent duration field is required" : null,
    },
  });

  const handleConfirmEdit = async (values) => {
    try {
      values.categories = values.categories.map((category) =>
        category.replace(/ /g, "_")
      );

      const apiRes = await fetch(
        `http://localhost:3001/api/v1/users/${userId}/products/${product.id}`,
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

      alert("Product updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating product data:", error);
    }
  };

  // fix categories not uploading in edit product

  return (
    <form onSubmit={form.onSubmit((values) => handleConfirmEdit(values))}>
      <Center mt={"xl"} pt={"xl"}>
        <Grid maw={800} grow gutter="xl" mt={"xl"}>
          <Grid.Col span={12}>
            <TextInput
              size="md"
              label="Title"
              {...form.getInputProps("title")}
            />
          </Grid.Col>
          <Grid.Col span="content">
            <MultiSelect
              size="md"
              data={categories}
              label="Categories"
              placeholder="Select a category"
              defaultValue={form.values.categories}
              {...form.getInputProps("categories")}
            />
          </Grid.Col>
          <Grid.Col span={2} />

          <Grid.Col>
            <Textarea
              size="md"
              label="Description"
              {...form.getInputProps("description")}
            />
          </Grid.Col>
          <Grid.Col></Grid.Col>
          <Grid.Col>
            <Group position="left" spacing={"xl"}>
              <NumberInput
                size="md"
                label="Price"
                {...form.getInputProps("purchasePrice")}
              />
              <Group position="right" spacing={"md"}>
                <NumberInput
                  size="md"
                  label="Rent"
                  {...form.getInputProps("rentPrice")}
                />
                <Select
                  mt={"lg"}
                  placeholder="Select option"
                  defaultValue={form.values.rentDuration}
                  data={[
                    { value: "daily", label: "Daily" },
                    { value: "hourly", label: "Hourly" },
                    { value: "weekly", label: "Weekly" },
                    { value: "monthly", label: "Monthly" },
                  ]}
                  {...form.getInputProps("rentDuration")}
                />
              </Group>
            </Group>
          </Grid.Col>
          <Grid.Col></Grid.Col>
          <Grid.Col></Grid.Col>
          <Grid.Col>
            <Group position="right">
              <Button size="md" color="red" onClick={onClose}>
                Go back
              </Button>
              <Button size="md" type="submit" color="violet">
                Edit Product
              </Button>
            </Group>
          </Grid.Col>
        </Grid>
      </Center>
    </form>
  );
};

export default EditProduct;
