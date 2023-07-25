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
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: "",
      password: "",
      confirm_password: "",
      address: "",
      phone_number: "",
      first_name: "",
      last_name: "",
    },
    validate: {
      first_name: (value) =>
        (value.length === 0) | (value.length < 2)
          ? "Name must have at least 2 letters"
          : null,
      last_name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 8 ? "Password must have at least 8 characters" : null,
      confirm_password: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  const registrationHandler = async (values) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        alert("Successfully signed up! Login to continue.");
        navigate("/");
      } else {
        const data = await response.json();
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Error registering user:", error.message);
      errorPopup(error.message);
    }
  };

  // Progress messages to user
  const errorPopup = (message) => toast.error(message);

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
        <form onSubmit={form.onSubmit((values) => registrationHandler(values))}>
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
            {...form.getInputProps("confirm_password")}
          />
          <Center>
            <Button mt="xl" type="submit">
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
      <ToastContainer position="top-center" autoClose={false} />
    </Flex>
  );
};

export default Signup;
