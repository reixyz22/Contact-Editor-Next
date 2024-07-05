import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import {Stream} from "node:stream";

const prisma = new PrismaClient();

interface UpdateContactRequest {
  currentEmail: string;
  newName?: string;
  newEmail?: string;
  newPhone?: string;
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.body instanceof Stream.Readable) {
    let rawData = '';
    req.body.on('data', (chunk) => {
      rawData += chunk;
    });

    await new Promise((resolve) => req.body.on('end', resolve));

    try {
      req.body = JSON.parse(rawData);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return res.status(400).json({ error: "Invalid JSON" });
    }
  }
  console.log('Request body:', req.body);  // Add logging to see what's in the request body

  const { currentEmail, newName, newEmail, newPhone } = req.body;
  if (!currentEmail) {
    console.error('Current email is undefined');
    return res.status(400).json({ error: "Current email is required" });
  }
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