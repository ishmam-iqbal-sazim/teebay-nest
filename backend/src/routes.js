import Router from "express";
import { PrismaClient } from "@prisma/client";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getMyProducts,
  buyProduct,
  rentProduct,
  getBoughtProducts,
  getSoldProducts,
  getRentedProducts,
  getLentProducts,
} from "./products/controller.js";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import { getAllCategories } from "./categories/controller.js";

const router = Router();
const prisma = new PrismaClient();

// Registration route
router.post("/register", async (req, res) => {
  const { email, password, address, phone_number, first_name, last_name } =
    req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    // Save new user data
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

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    // Handle authentication errors
    if (!user) {
      return res.status(400).json({ error: "Email not registered" });
    }

    if (password !== user.password) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // generate secretKey
    const secretKey = nanoid(32);

    // generate token
    const token = jwt.sign({ userId: user.id }, secretKey);

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
});

// Get all categories
router.get("/categories", getAllCategories);

// Get all products
router.get("/products", getAllProducts);

// Get current user products
router.get("/:userId/products", getMyProducts);

// Get current user bought products
router.get("/:userId/bought", getBoughtProducts);

// Get current user sold products
router.get("/:userId/sold", getSoldProducts);

// Get current user rented products
router.get("/:userId/rented", getRentedProducts);

// Get current user lent produrend
router.get("/:userId/lent", getLentProducts);

// Add Product
router.post("/:userId/product", addProduct);

// Delete Product
router.delete("/:userId/:productId/2", deleteProduct);

// Edit Product
router.patch("/:userId/:productId/1", editProduct);

// Buy Product
router.post("/buy/:userId/:productId", buyProduct);

// Rent Product
router.post("/rent/:userId/:productId", rentProduct);

export default router;
