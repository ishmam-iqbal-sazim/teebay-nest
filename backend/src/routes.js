import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
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

// Create a new product
router.post("/products", async (req, res) => {
  try {
    const {
      title,
      description,
      purchase_price,
      rent_price,
      rent_duration,
      categories,
    } = req.body;

    const userId = 1; // Replace this with the actual user ID

    // Does user exist?
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res
        .status(404)
        .json({ error: "How did you get here, user? GO SIGNUP!" });
    }

    // Create new product and associate it with user
    const product = await prisma.product.create({
      data: {
        title,
        description,
        purchase_price,
        rent_price,
        rent_duration,
        owner: {
          connect: { id: userId },
        },
        categories: {
          connect: categories.map((categoryId) => ({ id: categoryId })),
        },
      },
    });

    // New product
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error creating product" });
  }
});

// Update a product by ID
router.patch("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const {
    title,
    description,
    purchase_price,
    rent_price,
    rent_duration,
    categories,
  } = req.body;

  try {
    // Does product exist?
    const product = await prisma.product.findUnique({
      where: { id: Number(productId) },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Update the product
    const updatedProduct = await prisma.product.update({
      where: { id: Number(productId) },
      data: {
        title,
        description,
        purchase_price,
        rent_price,
        rent_duration,
        categories: {
          set: categories.map((categoryId) => ({ id: Number(categoryId) })),
        },
      },
    });

    // Respond with the updated product
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Error updating product" });
  }
});

// Delete a product by ID
router.delete("/products/:productId", async (req, res) => {
  // Handle deleting a product here
});

// Get all products
router.get("/products", async (req, res) => {
  res.json({ message: "hello I am all products" });
});

export default router;
