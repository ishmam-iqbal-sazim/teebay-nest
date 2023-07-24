import { AppShell } from "@mantine/core";
import Header from "./Header";

// eslint-disable-next-line react/prop-types
const NavbarLayout = ({ children }) => {
  return <AppShell header={<Header height={50} p="xs" />}>{children}</AppShell>;
};

export default NavbarLayout;
