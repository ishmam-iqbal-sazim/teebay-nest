import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const hardDeleteEverything = async () => {
  try {
    // Delete all records from the Transactions table first
    await prisma.transactions.deleteMany();

    // Delete all records from other tables
    await prisma.product.deleteMany();
    // Add more deleteMany statements for each table without foreign key constraints

    console.log("All records have been deleted.");
  } catch (error) {
    console.error("Error deleting records:", error);
  } finally {
    await prisma.$disconnect(); // Disconnect the Prisma Client
  }
};

hardDeleteEverything();
