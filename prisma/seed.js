import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = [
    { name: "ELECTRONICS" },
    { name: "FURNITURE" },
    { name: "HOME APPLIANCES" },
    { name: "SPORTING GOODS" },
    { name: "OUTDOOR" },
    { name: "TOYS" },
  ];

  for (const category of categories) {
    await prisma.category.create({
      data: category,
    });
  }

  console.log("Categories seeded successfully");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
