import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MyProducts from "./pages/MyProducts";
import AllProducts from "./pages/AllProducts";
import MyTransactions from "./pages/MyTransactions";

const queryClient = new QueryClient();

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {/* <AppShell header={<Header height={50} p="xs" />}> */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/my-products" element={<MyProducts />} />
            <Route path="/all-products" element={<AllProducts />} />
            <Route path="/my-transactions" element={<MyTransactions />} />
          </Routes>
          {/* </AppShell> */}
        </BrowserRouter>
      </QueryClientProvider>
    </MantineProvider>
  );
}
