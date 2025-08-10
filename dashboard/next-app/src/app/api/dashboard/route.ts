import { getIronSession } from 'iron-session';
import { sessionOptions } from '@/lib/session';
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';
import { BotManager } from '@/lib/BotManager';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
const botManager = new BotManager();

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

    const botStatus = await botManager.getBotStatus(user.id);
    const stats = await botManager.getBotStats(user.id);

    return NextResponse.json({
      botInstance,
      botStatus,
      stats,
    });
  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
