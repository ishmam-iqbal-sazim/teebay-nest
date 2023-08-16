import Router from "express";
import { PrismaClient } from "@prisma/client";

import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";

const router = Router();
const prisma = new PrismaClient();

const registerUser = async (req, res) => {
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
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    // Handle authentication errors
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    if (password !== user.password) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // generate secretKey
    const secretKey = nanoid(32);

    // generate token
    const token = jwt.sign({ userId: user.id }, secretKey);

    res.json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error logging in" });
  }
};

export { registerUser, loginUser };
