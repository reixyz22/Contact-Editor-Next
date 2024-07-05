// Import necessary modules
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface UpdateContactRequest {
  currentEmail: string;
  newName?: string;
  newEmail?: string;
  newPhone?: string;
}

// Export POST method explicitly
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { currentEmail, newName, newEmail, newPhone }: UpdateContactRequest = req.body;
  const dataToUpdate: { name?: string; email?: string; phone?: string } = {};

  if (newName) dataToUpdate.name = newName;
  if (newEmail) dataToUpdate.email = newEmail;
  if (newPhone) dataToUpdate.phone = newPhone;

  try {
    const updatedContact = await prisma.contact.update({
      where: { email: currentEmail },
      data: dataToUpdate,
    });
    res.status(200).json(updatedContact);
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ error: "Failed to update contact" });
  }
}

// Optionally, you can add more methods like 'get' as named exports if needed.
