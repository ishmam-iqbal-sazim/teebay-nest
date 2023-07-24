import { useState } from "react";
import {
  Stepper,
  Button,
  TextInput,
  Title,
  Container,
  Flex,
  NumberInput,
  MultiSelect,
  Select,
  Text,
  ActionIcon,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { GrClose } from "react-icons/gr";

// eslint-disable-next-line react/prop-types
function AddProduct({ onClose }) {
  const [active, setActive] = useState(0);

  const categories = [
    { label: "ELECTRONICS", value: "ELECTRONICS" },
    { label: "FURNITURE", value: "FURNITURE" },
    { label: "HOME APPLIANCES", value: "HOME APPLIANCES" },
    { label: "SPORTING GOODS", value: "SPORTING GOODS" },
    { label: "OUTDOOR", value: "OUTDOOR" },
    { label: "TOYS", value: "TOYS" },
  ];

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      purchase_price: "",
      rent_price: "",
      rent_duration: "",
      categories: [],
    },
  });

  const validateStep = () => {
    // Validate the required fields in the current step
    const { title, categories, purchase_price, rent_price, rent_duration } =
      form.values;
    if (active === 0 && title.trim() === "") {
      alert("Title is required.");
      return false;
    } else if (active === 1 && categories.length === 0) {
      alert("At least one category must be selected.");
      return false;
    } else if (
      active === 3 &&
      (purchase_price === "" || rent_price === "" || rent_duration === "")
    ) {
      alert("All price and rent fields are required.");
      return false;
    }
    return true;
  };

  const nextStep = () => {
    const isStepValid = validateStep();
    if (isStepValid) {
      setActive((current) => (current < 4 ? current + 1 : current));
    }
  };

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const handleSubmit = async () => {
    try {
      const apiRes = await fetch("http://localhost:3001/api/v1/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form.values),
      });

      if (!apiRes.ok) {
        console.error("Error saving product data");
        return;
      }
      alert("Product added successfully!");
      onClose();
    } catch (error) {
      console.error("Error saving product data:", error);
    }
  };

  return (
    <Flex justify="center" align="center" style={{ minHeight: "100vh" }}>
      <Container>
        <Flex justify={"flex-end"} pb={"xl"} mb={"xl"}>
          <ActionIcon onClick={onClose}>
            <GrClose />
          </ActionIcon>
        </Flex>
        <Stepper
          active={active}
          onStepClick={setActive}
          breakpoint="sm"
          w={"80vh"}
          h={"30vh"}
        >
          <Stepper.Step>
            <TextInput
              label="Select a title for your product"
              {...form.getInputProps("title")}
            />
          </Stepper.Step>

          <Stepper.Step>
            <MultiSelect
              data={categories}
              label="Select Categories"
              placeholder="Select a category"
              {...form.getInputProps("categories")}
            />
          </Stepper.Step>

          <Stepper.Step>
            <TextInput
              label="Select Description"
              {...form.getInputProps("description")}
            />
          </Stepper.Step>

          <Stepper.Step>
            <NumberInput
              label="Select Price"
              placeholder="Purchase price"
              {...form.getInputProps("purchase_price")}
            />
            <NumberInput
              label="Rent"
              placeholder="$40"
              {...form.getInputProps("rent_price")}
            />
            <Select
              placeholder="Select option"
              data={[
                { value: "daily", label: "Daily" },
                { value: "hourly", label: "Hourly" },
                { value: "weekly", label: "Weekly" },
                { value: "monthly", label: "Monthly" },
              ]}
              {...form.getInputProps("rent_duration")}
            />
          </Stepper.Step>

          <Stepper.Completed>
            <Title>Summary</Title>
            <Text>Title: {form.values.title}</Text>
            <Text>
              Categories:{" "}
              {form.values.categories
                .map((category) => {
                  const categoryName = category.toLowerCase();
                  return (
                    categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
                  );
                })
                .join(", ")}
            </Text>
            <Text>Description: {form.values.description}</Text>
            <Text>
              Price: {form.values.purchase_price}, To rent:{" "}
              {form.values.rent_price}
            </Text>
          </Stepper.Completed>
        </Stepper>

        <Flex justify={"space-between"} mt="100px">
          {active !== 0 && (
            <Button variant="light" color="violet" onClick={prevStep}>
              Back
            </Button>
          )}
          {active !== 4 && (
            <Button color="violet" onClick={nextStep}>
              Next step
            </Button>
          )}
          {active === 4 && (
            <Button color="violet" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </Flex>
      </Container>
    </Flex>
  );
}

export default AddProduct;
