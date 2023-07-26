import {
  Box,
  Button,
  PasswordInput,
  TextInput,
  Center,
  Text,
  Flex,
  Grid,
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
      errorPopup("An unexpected error occurred");
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
              <TextInput
                size="md"
                placeholder="First Name"
                {...form.getInputProps("first_name")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                size="md"
                placeholder="Last Name"
                {...form.getInputProps("last_name")}
              />
            </Grid.Col>
            <Grid.Col>
              <TextInput
                size="md"
                placeholder="Address"
                {...form.getInputProps("address")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                size="md"
                placeholder="Email"
                {...form.getInputProps("email")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                size="md"
                placeholder="Phone Number"
                {...form.getInputProps("phone_number")}
              />
            </Grid.Col>
            <Grid.Col>
              <PasswordInput
                size="md"
                placeholder="Password"
                {...form.getInputProps("password")}
              />
            </Grid.Col>
            <Grid.Col>
              <PasswordInput
                size="md"
                placeholder="Confirm password"
                {...form.getInputProps("confirm_password")}
              />
            </Grid.Col>
            <Grid.Col></Grid.Col>
            <Grid.Col>
              <Center>
                <Button
                  size="sm"
                  type="submit"
                  uppercase
                  color="violet"
                  radius={"sm"}
                >
                  Register
                </Button>
              </Center>
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
