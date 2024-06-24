import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const contacts = [
    {
      name: 'P X',
      email: 'PX@example.com',
      phone: '888-232-2222',
    },
    {
      name: 'Bob Smith',
      email: 'bob@example.com',
      phone: '987-654-3210',
    },
    {
      name: 'Victoria Ng',
      email: 'V@chiwae.com',
      phone: '555-555-5555',
    },
  ];

  for (const contact of contacts) {
    await prisma.contact.create({
      data: contact,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
