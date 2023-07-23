import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
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
      where: {
        ownerId: userId,
        transactions: {
          every: {
            status: {
              not: "SOLD",
            },
          },
        },
      },
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

    // Find product by ID
    const product = await prisma.product.findUnique({
      where: { id: productId },
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
      where: { id: productId },
      include: { categories: true },
    });

    if (!product || product.ownerId !== userId) {
      return res.status(404).json({ error: "Product not found" });
    }

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
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

const buyProduct = async (req, res) => {
  const customerId = parseInt(req.params.userId, 10);
  const productId = parseInt(req.params.productId, 10);

  console.log(customerId, productId);

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { categories: true, owner: true },
    });

    if (!product || product.ownerId === customerId) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Checks
    const existingTransaction = await prisma.transactions.findFirst({
      where: {
        productId: productId,
        userId: product.ownerId,
        status: { in: ["SOLD", "BOUGHT"] },
      },
    });

    if (existingTransaction) {
      return res.status(400).json({
        error: "Product has already been sold",
      });
    }

    const transaction = await prisma.transactions.create({
      data: {
        status: "BOUGHT", // Set status "BOUGHT" for customer
        product: {
          connect: { id: productId },
        },
        user: {
          connect: { id: customerId },
        },
      },
    });

    console.log("checkpoint 5", transaction);

    const soldTransaction = await prisma.transactions.create({
      data: {
        status: "SOLD", // Set status "SOLD" owner (seller)
        product: {
          connect: { id: productId },
        },
        user: {
          connect: { id: product.ownerId },
        },
      },
    });

    console.log("checkpoint 6", soldTransaction);

    // Update product ownership
    await prisma.product.update({
      where: { id: productId },
      data: {
        ownerId: customerId,
      },
    });

    console.log("checkpoint 7");

    res.json({ transaction, soldTransaction });
  } catch (error) {
    res.status(500).json({ error: "Error buying product" });
  }
};

const rentProduct = async (req, res) => {
  const customerId = parseInt(req.params.userId, 10);
  const productId = parseInt(req.params.productId, 10);
  const { rent_duration } = req.body;

  console.log(customerId, productId, rent_duration);

  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { categories: true, owner: true },
    });

    if (!product || product.ownerId === customerId) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Checks
    const existingBoughtTransaction = await prisma.transactions.findFirst({
      where: {
        productId: productId,
        userId: product.ownerId,
        status: { in: ["SOLD", "BOUGHT"] },
      },
    });

    if (existingBoughtTransaction) {
      return res.status(400).json({
        error: "Product has already been sold",
      });
    }

    const existingLentTransaction = await prisma.transactions.findFirst({
      where: {
        productId: productId,
        userId: product.ownerId,
        status: { in: ["LENT"] },
      },
    });

    if (existingLentTransaction) {
      return res.status(400).json({
        error: "Product has already been rented",
      });
    }

    // Create a new transaction for the rent/lend and one for the owner
    const transaction = await prisma.transactions.create({
      data: {
        status: "RENTED", // Set status "RENTED" for customer
        product: {
          connect: { id: productId },
        },
        user: {
          connect: { id: customerId },
        },
      },
    });

    console.log("checkpoint 5", transaction);

    const lendTransaction = await prisma.transactions.create({
      data: {
        status: "LENT", // Set status "LENT" for owner (lender)
        product: {
          connect: { id: productId },
        },
        user: {
          connect: { id: product.ownerId },
        },
      },
    });

    console.log("checkpoint 6", lendTransaction);

    // Update product ownership (owner remains the same)
    if (rent_duration) {
      // rent_duration is optional
      await prisma.product.update({
        where: { id: productId },
        data: {
          ownerId: customerId,
          rent_duration: rent_duration, // Set rent_duration for the product
        },
      });
    } else {
      await prisma.product.update({
        where: { id: productId },
        data: {
          ownerId: customerId,
        },
      });
    }

    console.log("checkpoint 7");

    res.json({ transaction, lendTransaction });
  } catch (error) {
    res.status(500).json({ error: "Error renting/lending product" });
  }
};

export {
  getAllProducts,
  getMyProducts,
  addProduct,
  deleteProduct,
  editProduct,
  buyProduct,
  rentProduct,
};
