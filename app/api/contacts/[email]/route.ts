import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query;

  if (typeof email !== 'string') {
    return res.status(400).json({ error: 'Invalid email parameter' });
  }

  try {
    const contact = await prisma.contact.findUnique({
      where: { email },  // Ensure this matches the Prisma schema definition
    });

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}
