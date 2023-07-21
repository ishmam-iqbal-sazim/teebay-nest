import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getProducts = async (req, res) => {
  const userId = 1; // replace later with original userId

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const products = await prisma.product.findMany({
      where: { ownerId: userId },
      select: {
        id: true,
        title: true,
        description: true,
        purchase_price: true,
        rent_price: true,
        rent_duration: true,
        ownerId: true,
        owner: true,
        categories: true,
      },
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving products" });
  }
};

const addProduct = async (req, res) => {
  const userId = 1; // replace later with original userId

  const {
    title,
    description,
    purchase_price,
    rent_price,
    rent_duration,
    categories,
  } = req.body;

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
};

export { getProducts, addProduct };
