import Router from "express";
import { PrismaClient } from "@prisma/client";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getMyProducts,
} from "./products/controller.js";

const router = Router();
const prisma = new PrismaClient();

// Registration route
router.post("/register", async (req, res) => {
  const { email, password, address, phone_number, first_name, last_name } =
    req.body;

  try {
    // Does user already exist?
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User with this email already exists" });
    }

    // Save user data
    const user = await prisma.user.create({
      data: {
        email,
        password,
        address,
        phone_number,
        first_name,
        last_name,
      },
    });

    // Respond with newly created user
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "Email not registered" });
    }

    if (password !== user.password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Respond with the user data
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
});

// Get current user products
router.get("/:userId/products", getMyProducts);

// Add Product
router.post("/product", addProduct);

// Delete Product
router.delete("/:userId/:productId/2", deleteProduct);

// Edit Product
router.patch("/:userId/:productId/1", editProduct);

export default router;
