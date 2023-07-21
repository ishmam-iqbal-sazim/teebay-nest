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
import { Link } from "react-router-dom";

const Login = () => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async () => {
    console.log(form.values);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/login",
        form.values
      );
      console.log("User logged in:", response.data);
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
            {`Don't have an account?`} <Link to="/signup">Sign up</Link>
          </Text>
        </Center>
      </Box>
    </Flex>
  );
};

export default Login;
