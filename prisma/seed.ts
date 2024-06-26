import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const contacts = [
    {
      name: 'Bob Smith',
      email: 'bob@example.com',
      phone: '987-654-3210',
    },
    {
      name: 'P X',
      email: 'PX@example.com',
      phone: '987-654-3210',
    },
    {
      name: 'Victoria Ng',
      email: 'V@chiwae.com',
      phone: '555-555-5555',
    },
    {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      phone: '923-456-7890',
    },
    {
      name: 'Carlos Gomez',
      email: 'carlos@example.com',
      phone: '934-567-8901',
    },
    {
      name: 'Diana Reed',
      email: 'diana@example.com',
      phone: '945-678-9012',
    },
    {
      name: 'Evan Zhao',
      email: 'evan@example.com',
      phone: '956-789-0123',
    },
    {
      name: 'Fiona Chen',
      email: 'fiona@example.com',
      phone: '967-890-1234',
    },
    {
      name: 'George Murray',
      email: 'george@example.com',
      phone: '978-901-2345',
    },
    {
      name: 'Hannah Lee',
      email: 'hannah@example.com',
      phone: '989-012-3456',
    },
    {
      name: 'Ian Vance',
      email: 'ian@example.com',
      phone: '990-123-4567',
    },
    {
      name: 'Julia Scott',
      email: 'julia@example.com',
      phone: '901-234-5678',
    },
    {
      name: 'Kevin Luo',
      email: 'kevin@example.com',
      phone: '912-345-6789',
    },
    {
      name: 'Mia Foster',
      email: 'mia@example.com',
      phone: '934-567-8901',
    },
    {
      name: 'Nathan Yip',
      email: 'nathan@example.com',
      phone: '945-678-9012',
    },
    {
      name: 'Olivia Grant',
      email: 'olivia@example.com',
      phone: '956-789-0123',
    },
    {
      name: 'Pablo Neruda',
      email: 'pablo@example.com',
      phone: '967-890-1234',
    },
    {
      name: 'Quinn Erickson',
      email: 'quinn@example.com',
      phone: '978-901-2345',
    },
    {
      name: 'Rosa Martinez',
      email: 'rosa@example.com',
      phone: '989-012-3456',
    },
    {
      name: 'Samuel Watson',
      email: 'samuel@example.com',
      phone: '990-123-4567',
    }
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
