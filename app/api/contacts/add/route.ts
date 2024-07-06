import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    const body = await request.json();
    if (!body) {
        console.error('Invalid parameters');
        return NextResponse.json({ error: 'Invalid body parameter: ' + body }, { status: 400 });
    }

    const { name, email, phone } = body;
    const updateData = { name, email, phone };

    if (!email) {
        console.error('No email id given');
        return NextResponse.json({ error: 'No email id given' }, { status: 400 });
    }

    try {
        const updatedContact = await prisma.contact.create({
            data: updateData
        });
        return new NextResponse(JSON.stringify(updatedContact), { status: 200 });
    } catch (error) {
        console.error('Error updating/creating contact:', error);
        return new NextResponse(JSON.stringify({ error: 'Failed to create contact' }), { status: 500 });
    }
}
