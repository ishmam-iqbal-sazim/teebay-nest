import { Button, Grid, Group, Paper, Text } from "@mantine/core";
import { Link } from "react-router-dom";

let user = JSON.parse(localStorage.getItem("currentUser"));

const Header = () => {
  console.log(user);
  return (
    <Paper shadow="sm" p="sm">
      <Grid grow px={20}>
        <Grid.Col span={1} sx={{ verticalAlign: "middle" }}>
          <Group position="center" mt={"1px"}>
            <Text
              variant="gradient"
              gradient={{ from: "indigo", to: "violet", deg: 60 }}
              sx={{
                fontFamily: "Greycliff CF, sans-serif",
                userSelect: "none",
              }}
              ta="center"
              fz="xl"
              fw={400}
            >
              <Link to={`/my-products`}>teebay</Link>
            </Text>
          </Group>
        </Grid.Col>
        <Grid.Col span={6}>
          <Group position="right">
            <Link to={`/all-products`}>
              <Button variant="subtle" color="violet" uppercase>
                All Products
              </Button>
            </Link>
            <Link to={`/my-products`}>
              <Button variant="subtle" color="violet" uppercase>
                My Products
              </Button>
            </Link>
            <Link to={`/my-transactions`}>
              <Button variant="subtle" color="violet" uppercase>
                My Transactions
              </Button>
            </Link>
          </Group>
        </Grid.Col>
        <Grid.Col span={1}>
          <Group position="right" grow spacing={"sm"}>
            <Text color="black" fw={300} fz={"sm"}>
              Hello, {user.first_name}
            </Text>
            <Button color="red" uppercase>
              Logout
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default Header;
