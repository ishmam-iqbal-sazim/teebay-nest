import { AppShell } from "@mantine/core";
import Header from "./Header";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const NavbarLayout = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [user, setUser] = useState(currentUser);

  useEffect(() => {
    // Update the user state whenever the currentUser changes
    setUser(JSON.parse(localStorage.getItem("currentUser")));
  }, []);

  return (
    <AppShell user={user} header={<Header user={user} height={50} p="xs" />}>
      {children}
    </AppShell>
  );
};

export default NavbarLayout;
