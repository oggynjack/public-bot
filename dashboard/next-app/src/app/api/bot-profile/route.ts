import { getIronSession } from 'iron-session';
import { sessionOptions } from '@/lib/session';
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const session = await getIronSession(cookies(), sessionOptions);
  const user = session.user;

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const botInstance = await prisma.botInstance.findUnique({
      where: { userId: user.id },
    });

    if (!botInstance) {
      return NextResponse.json({ message: 'Bot not found' }, { status: 404 });
    }

    return NextResponse.json({
      botName: botInstance.botName,
      avatarUrl: botInstance.avatarUrl,
    });
  } catch (error) {
    console.error('Bot profile GET error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await getIronSession(cookies(), sessionOptions);
  const user = session.user;

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { botName, avatarUrl } = await request.json();

    await prisma.botInstance.update({
      where: { userId: user.id },
      data: {
        botName,
        avatarUrl,
      },
    });

    return NextResponse.json({ message: 'Profile saved successfully' });
  } catch (error) {
    console.error('Bot profile POST error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
