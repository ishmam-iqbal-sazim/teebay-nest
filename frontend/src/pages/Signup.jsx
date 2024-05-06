import { Box, Center, Text, Flex, Grid } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyTextInput from "../components/formComponents/MyTextInput";
import MyPasswordInput from "../components/formComponents/MyPasswordInput";
import MyButton from "../components/formComponents/MyButton";
import {
  validateAddress,
  validateConfirmPassword,
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePassword,
} from "../lib/formValidation";

const Signup = () => {
  const navigate = useNavigate();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      phoneNumber: "",
      firstName: "",
      lastName: "",
    },
    validate: {
      firstName: validateFirstName,
      lastName: validateLastName,
      address: validateAddress,
      email: validateEmail,
      password: validatePassword,
      confirmPassword: validateConfirmPassword,
    },
  });

  const registrationHandler = async (values) => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        toast.success("Successfully signed up! Login to continue.");
        navigate("/");
      }
    } catch (error) {
      console.error("Error registering user:", error.message);
      toast.error(error.message);
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
        maw={750}
        m="lg"
        p="6rem"
        sx={{
          border: "2px rgba(162, 160, 160, 0.412) solid",
        }}
      >
        <form onSubmit={form.onSubmit((values) => registrationHandler(values))}>
          <Grid gutter="xl">
            <Grid.Col span={6}>
              <MyTextInput
                placeholder="First Name"
                inputProps={{ ...form.getInputProps("firstName") }}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <MyTextInput
                placeholder="Last Name"
                inputProps={{ ...form.getInputProps("lastName") }}
              />
            </Grid.Col>
            <Grid.Col>
              <MyTextInput
                placeholder="Address"
                inputProps={{ ...form.getInputProps("address") }}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <MyTextInput
                placeholder="Email"
                inputProps={{ ...form.getInputProps("email") }}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <MyTextInput
                placeholder="Phone Number"
                inputProps={{ ...form.getInputProps("phoneNumber") }}
              />
            </Grid.Col>
            <Grid.Col>
              <MyPasswordInput
                placeholder="Password"
                inputProps={{ ...form.getInputProps("password") }}
              />
            </Grid.Col>
            <Grid.Col>
              <MyPasswordInput
                placeholder="Confirm password"
                inputProps={{ ...form.getInputProps("confirmPassword") }}
              />
            </Grid.Col>
            <Grid.Col></Grid.Col>
            <Grid.Col>
              <MyButton text="register" />
            </Grid.Col>
            <Grid.Col></Grid.Col>
            <Grid.Col>
              <Center>
                <Text>
                  {`Already have an account? `} <Link to="/">Sign In</Link>
                </Text>
              </Center>
            </Grid.Col>
          </Grid>
        </form>
      </Box>
      <ToastContainer position="top-center" autoClose={false} />
    </Flex>
  );
};

export default Signup;
