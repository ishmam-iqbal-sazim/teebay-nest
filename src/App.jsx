import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MyProducts from "./pages/MyProducts";
import EditProduct from "./components/EditProduct";

const queryClient = new QueryClient();

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/my-products" element={<MyProducts />} />
            <Route path="/demo" element={<EditProduct />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </MantineProvider>
  );
}
