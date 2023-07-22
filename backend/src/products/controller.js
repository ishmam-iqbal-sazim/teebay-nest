import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getMyProducts = async (req, res) => {
  const userId = parseInt(req.params.userId, 10); // convert string to integer

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
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
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
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
        connect: categories.map((category) => ({ name: category })),
      },
    },
  });

  // New product
  res.json(product);
};

const deleteProduct = async (req, res) => {
  const userId = parseInt(req.params.userId, 10); // convert string to integer

  try {
    const productId = parseInt(req.params.productId, 10);
    console.log(userId, productId);

    // Find product by ID
    const product = await prisma.product.findUnique({
      where: { id: Number(productId) },
      include: { categories: true },
    });

    if (!product || product.ownerId !== userId) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Delete product
    await prisma.product.delete({ where: { id: Number(productId) } });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting product" });
  }
};

const editProduct = async (req, res) => {
  const userId = parseInt(req.params.userId, 10); // convert string to integer

  try {
    const productId = parseInt(req.params.productId, 10);
    const {
      title,
      description,
      purchase_price,
      rent_price,
      rent_duration,
      categories,
    } = req.body;

    // Find product by ID
    const product = await prisma.product.findUnique({
      where: { id: Number(productId) },
      include: { categories: true },
    });

    if (!product || product.ownerId !== userId) {
      return res.status(404).json({ error: "Product not found" });
    }

    const updatedProduct = await prisma.product.update({
      where: { id: Number(productId) },
      data: {
        title,
        description,
        purchase_price,
        rent_price,
        rent_duration,
        categories: {
          set: categories.map((category) => ({ name: category })),
        },
      },
    });

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Error updating product" });
  }
};

export { getMyProducts, addProduct, deleteProduct, editProduct };
