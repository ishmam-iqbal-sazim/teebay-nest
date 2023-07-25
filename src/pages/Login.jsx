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

// eslint-disable-next-line react/prop-types
const Login = () => {
  const navigate = useNavigate();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const loginHandler = async (values) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        const data = await response.json();

        const authToken = data.token;

        // Save user data to localStorage for later use
        localStorage.setItem("currentUser", JSON.stringify(data.user));

        // Naive user authentication
        if (authToken) {
          navigate("/my-products");
        }
      } else {
        const errorMessage = await response.json();
        errorPopup(errorMessage.error);
      }
    } catch (error) {
      console.error(error.message);
      errorPopup("An unexpected error occurred. Please try again.");
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
      <Text fz={"xl"}>SIGN IN</Text>
      <Box
        maw={520}
        mx="auto"
        mt="lg"
        p={"50px"}
        sx={{
          border: "1px rgba(118, 117, 117, 0.5) solid",
        }}
      >
        <form onSubmit={form.onSubmit((values) => loginHandler(values))}>
          <TextInput placeholder="Email" {...form.getInputProps("email")} />
          <PasswordInput
            mt="md"
            placeholder="Password"
            {...form.getInputProps("password")}
          />
          <Center>
            <Button mt="xl" type="submit">
              Login
            </Button>
          </Center>
        </form>
        <Center>
          <Text mt="lg">
            {`Don't have an account?`} <Link to="/register">Sign up</Link>
          </Text>
        </Center>
      </Box>
      <ToastContainer position="top-center" autoClose={false} />
    </Flex>
  );
};

export default Login;
