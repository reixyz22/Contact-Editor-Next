import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    const body = await request.json();
    const path = new URL(request.url).pathname;
    const email = path.split('/')[3];

    console.log('Email received for API request:', email);  // Debug to check what email is received

    if (!body) {
        console.error('Invalid email parameter');
        return NextResponse.json({ error: 'Invalid body parameter: ' + body }, { status: 400 });
    }
    console.log('body:', body);

    if (!email) {
        console.error('Invalid email parameter');
        return NextResponse.json({ error: 'Invalid email parameter: ' + email + " path " + path }, { status: 400 });
    }
    const currentEmail = email;
    const { name: newName, email: newEmail, phone: newPhone } = body;
    const updateData: any = {}; // Create an object to accumulate updates

    // Only add fields to updateData if they are defined and not empty
    if (newName ) updateData.name = newName;
    if (newEmail ) updateData.email = newEmail;
    if (newPhone ) updateData.phone = newPhone;
   console.log("body " + " name "+ updateData.name + " email "+ updateData.email + " phone "+ updateData.phone )

    try {
        console.log("data " + " name "+ updateData.name + " email "+ updateData.email + " phone "+ updateData.phone )
        const updatedContact = await prisma.contact.update({
            where: { email: currentEmail },
            data: updateData
        });
        return new NextResponse(JSON.stringify(updatedContact), { status: 200 });
    } catch (error) {
        console.error('Error updating contact:', error);
        if (error === 'P2025') {
            return new NextResponse(JSON.stringify({ error: 'No contact found with that email to update' }), { status: 404 });
        }
        return new NextResponse(JSON.stringify({ error: 'Failed to update contact' }), { status: 500 });
    }
}
