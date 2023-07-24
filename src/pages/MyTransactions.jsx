import { Button, Group, Tabs, Text } from "@mantine/core";
import BoughtProducts from "../components/transactions/BoughtProducts";
import SoldProducts from "../components/transactions/SoldProducts";
import BorrowedProducts from "../components/transactions/BorrowedProducts";
import LentProducts from "../components/transactions/LentProducts";
import { Link } from "react-router-dom";

let user = JSON.parse(localStorage.getItem("currentUser"));

const MyTransactions = () => {
  let userId = user?.id;

  if (!userId) {
    return <div>PLease login</div>;
  }

  return (
    <div>
      <Tabs py={5} color="violet" defaultValue="bought">
        <Tabs.List position="center" grow sx={{ border: "0px" }} color="violet">
          <Tabs.Tab value="bought">
            <Text>Bought</Text>
          </Tabs.Tab>
          <Tabs.Tab value="sold">
            <Text>Sold</Text>
          </Tabs.Tab>
          <Tabs.Tab value="borrowed">Borrowed</Tabs.Tab>
          <Tabs.Tab value="lent">Lent</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="bought" pt="xs">
          <BoughtProducts userId={userId} />
        </Tabs.Panel>

        <Tabs.Panel value="sold" pt="xs">
          <SoldProducts userId={userId} />
        </Tabs.Panel>

        <Tabs.Panel value="borrowed" pt="xs">
          <BorrowedProducts userId={userId} />
        </Tabs.Panel>

        <Tabs.Panel value="lent" pt="xs">
          <LentProducts userId={userId} />
        </Tabs.Panel>
      </Tabs>
      <Group position="center" spacing={"xl"}>
        <Link to={`/my-products`}>
          <Button variant="subtle" color="violet" uppercase>
            My Products
          </Button>
        </Link>
        <Link to={`/all-products`}>
          <Button variant="subtle" color="violet" uppercase>
            All Products
          </Button>
        </Link>
      </Group>
    </div>
  );
};

export default MyTransactions;
