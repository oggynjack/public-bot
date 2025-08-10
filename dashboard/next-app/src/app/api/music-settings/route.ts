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
      defaultVolume: botInstance.defaultVolume,
      enable247: botInstance.enable247,
      enableAutoplay: botInstance.enableAutoplay,
    });
  } catch (error) {
    console.error('Music settings GET error:', error);
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
    const { defaultVolume, enable247, enableAutoplay } = await request.json();

    await prisma.botInstance.update({
      where: { userId: user.id },
      data: {
        defaultVolume,
        enable247,
        enableAutoplay,
      },
    });

    return NextResponse.json({ message: 'Settings saved successfully' });
  } catch (error) {
    console.error('Music settings POST error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
