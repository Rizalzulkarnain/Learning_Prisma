import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      username: "Elon Chang",
      password: "123456789",
    }
  })
}

main().then((error) => {
  console.log(error);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
})
