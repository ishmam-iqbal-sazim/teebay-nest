import {
  Box,
  Button,
  Center,
  Flex,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";

const AddForm = () => {
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      purchase_price: 0,
      rent_price: 0,
      rent_duration: "",
      categories: [],
    },
  });

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/products",
        form.values
      );
      console.log("Product added:", response.data);
    } catch (error) {
      console.error("Error adding product:", error.message);
    }
  };
  return (
    <Flex
      justify="center"
      align="center"
      direction="column"
      style={{ minHeight: "100vh" }}
    >
      <Title order={1}>MY PRODUCTS</Title>
      <Box
        maw={520}
        mx="auto"
        mt="lg"
        p={"50px"}
        sx={{
          border: "1px rgba(118, 117, 117, 0.5) solid",
        }}
      >
        <Center>
          <Text fz={"xl"}>Add product</Text>
        </Center>
        <form>
          <Box>
            <TextInput
              mt={"md"}
              label="Select a title for your product"
              {...form.getInputProps("title")}
            />
            <Center>
              <Button mt="xl" type="button">
                Next
              </Button>
            </Center>
          </Box>
          <Box>
            <TextInput
              mt={"md"}
              label="Select categories"
              placeholder="Select a category"
              {...form.getInputProps("category")}
            />
            <Center>
              <Button mt="xl" type="button">
                Back
              </Button>
              <Button mt="xl" type="button">
                Next
              </Button>
            </Center>
          </Box>
          <Box>
            <TextInput
              mt={"md"}
              label="Select Description"
              {...form.getInputProps("description")}
            />
            <Center>
              <Button mt="xl" type="button">
                Back
              </Button>
              <Button mt="xl" type="button">
                Next
              </Button>
            </Center>
          </Box>
          <Box>
            <TextInput
              mt={"md"}
              label="Select Price"
              {...form.getInputProps("price")}
            />
            <Flex>
              <TextInput
                mt={"md"}
                label="Rent"
                {...form.getInputProps("rent_price")}
              />
              <TextInput
                mt={"md"}
                placeholder="Select option"
                {...form.getInputProps("rent_duration")}
              />
            </Flex>
            <Center>
              <Button mt="xl" type="button">
                Back
              </Button>
              <Button mt="xl" type="button">
                Next
              </Button>
            </Center>
          </Box>
          <Box>
            <Center>
              <Flex
                mt={"5rem"}
                justify="center"
                align="center"
                direction="column"
              >
                <Title order={3}>Summary</Title>
                <Text>Title: {form.values.title}</Text>
                <Text>Categories: {form.values.category}</Text>
                <Text>Description: {form.values.description}</Text>
                <Text>
                  Price: {form.values.purchase_price}, To rent:
                  {form.values.rent_price}
                  {form.values.rent_price}{" "}
                </Text>
              </Flex>
            </Center>
          </Box>
          <Center>
            <Button mt="xl" type="button" onClick={handleSubmit}>
              Submit
            </Button>
          </Center>
        </form>
      </Box>
    </Flex>
  );
};

export default AddForm;
