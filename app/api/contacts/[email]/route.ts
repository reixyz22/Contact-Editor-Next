import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  // Parse the URL and extract search parameters
  const path = new URL(request.url).pathname;
  const email = path.split('/')[3];  // Adjust the index according to your actual URL structure

  console.log('Email received for API request:', email);  // Debug to check what email is received

  // Check if the email parameter is present
  if (!email) {
    console.error('Invalid email parameter');
    return NextResponse.json({ error: 'Invalid email parameter: ' + email + " path " + path }, { status: 400 });
  }

  try {
    // Attempt to find the contact with the specified email
    const contact = await prisma.contact.findUnique({
      where: { email: email },
    });
    console.log('Contact Query Result:', contact);  // Debug to see the database query result

    // Check if the contact is found
    if (!contact) {
      console.error('Contact not found for email:', email);
      return NextResponse.json({ error: 'Contact not found for email: ' + email }, { status: 404 });
    }

    // If contact is found, return it
    return NextResponse.json(contact);
  } catch (error) {
    // Log and handle any server error
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    // Ensure the database connection is closed after the operation
    await prisma.$disconnect();
  }
}
