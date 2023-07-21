import {
  Box,
  Button,
  PasswordInput,
  TextInput,
  Center,
  Text,
  Flex,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      address: "",
      phone_number: "",
      first_name: "",
      last_name: "",
    },
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/register",
        form.values
      );
      console.log("User registered:", response.data);
      if (response.data.id) {
        navigate("/my-products");
      }
    } catch (error) {
      console.error("Error registering user:", error.message);
    }
  };

  return (
    <Flex
      justify="center"
      align="center"
      direction="column"
      style={{ minHeight: "100vh" }}
    >
      <Text fz={"xl"}>SIGN UP</Text>
      <Box
        maw={520}
        mx="auto"
        mt="lg"
        p={"50px"}
        sx={{
          border: "1px rgba(118, 117, 117, 0.5) solid",
        }}
      >
        <form>
          <TextInput
            placeholder="First Name"
            {...form.getInputProps("first_name")}
          />
          <TextInput
            mt="md"
            placeholder="Last Name"
            {...form.getInputProps("last_name")}
          />
          <TextInput
            mt="md"
            placeholder="Address"
            {...form.getInputProps("address")}
          />
          <TextInput
            mt="md"
            placeholder="Email"
            {...form.getInputProps("email")}
          />
          <TextInput
            mt="md"
            placeholder="Phone Number"
            {...form.getInputProps("phone_number")}
          />
          <PasswordInput
            mt="md"
            placeholder="Password"
            {...form.getInputProps("password")}
          />
          <PasswordInput
            mt="md"
            placeholder="Confirm password"
            {...form.getInputProps("password")}
          />
          <Center>
            <Button mt="xl" type="button" onClick={handleSubmit}>
              Sign Up
            </Button>
          </Center>
          <Center mt="lg">
            <Text>
              {`Already have an account? `} <Link to="/">Login</Link>
            </Text>
          </Center>
        </form>
      </Box>
    </Flex>
  );
};

export default Signup;
