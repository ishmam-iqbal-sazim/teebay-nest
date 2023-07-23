import { Button, Group, Tabs } from "@mantine/core";
import BoughtProducts from "../components/BoughtProducts";
import SoldProducts from "../components/SoldProducts";
import BorrowedProducts from "../components/BorrowedProducts";
import LentProducts from "../components/LentProducts";
import { Link } from "react-router-dom";

const MyTransactions = () => {
  let userId = 5;

  return (
    <div>
      <Tabs color="violet" defaultValue="bought">
        <Tabs.List position="center" grow sx={{ border: "0px" }}>
          <Tabs.Tab value="bought">Bought</Tabs.Tab>
          <Tabs.Tab value="sold">Sold</Tabs.Tab>
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
          <Button uppercase>My Products</Button>
        </Link>
        <Link to={`/all-products`}>
          <Button uppercase>All Products</Button>
        </Link>
      </Group>
    </div>
  );
};

export default MyTransactions;
