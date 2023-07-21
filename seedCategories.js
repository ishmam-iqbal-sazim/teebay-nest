import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categoryNames = [
  "ELECTRONICS",
  "FURNITURE",
  "HOME APPLIANCES",
  "SPORTING GOODS",
  "OUTDOOR",
  "TOYS",
];

async function seedCategories() {
  try {
    await prisma.$connect();

    for (const name of categoryNames) {
      await prisma.category.create({
        data: {
          name,
        },
      });
      console.log(`Category "${name}" created.`);
    }
  } catch (error) {
    console.error("Error seeding categories:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedCategories();
