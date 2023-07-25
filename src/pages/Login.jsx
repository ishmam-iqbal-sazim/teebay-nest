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

// eslint-disable-next-line react/prop-types
const Login = () => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/login",
        form.values
      );

      // Save user data for later use
      localStorage.setItem("currentUser", JSON.stringify(response.data));

      const authToken = response.data.token;
      localStorage.setItem("authToken", authToken);

      // Reload to ensure authentiaiton token is immediately available
      window.location.reload;

      console.log("User logged in:", response.data);
      // if (response.data.id) {
      //   navigate("/my-products");
      // }
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

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
        <form>
          <TextInput placeholder="Email" {...form.getInputProps("email")} />
          <PasswordInput
            mt="md"
            placeholder="Password"
            {...form.getInputProps("password")}
          />
          <Center>
            <Button mt="xl" type="button" onClick={handleSubmit}>
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
    </Flex>
  );
};

export default Login;
