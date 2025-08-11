import { getIronSession } from 'iron-session';
import { sessionOptions } from '@/lib/session';
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';
import { BotManager } from '@/lib/BotManager';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();
const botManager = new BotManager();

export async function POST(request: Request) {
  const session = await getIronSession(await cookies(), sessionOptions);
  const user = session.user;

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { botToken, applicationId } = await request.json();

    // Validate bot token format
    if (!botToken.match(/^[A-Za-z0-9._-]{50,}$/)) {
      return NextResponse.json(
        { message: 'Invalid bot token format' },
        { status: 400 }
      );
    }

    // Validate application ID format
    if (!applicationId.match(/^\d{17,19}$/)) {
      return NextResponse.json(
        { message: 'Invalid application ID format' },
        { status: 400 }
      );
    }

    // Test bot token
    const isValid = await botManager.validateBotToken(botToken);
    if (!isValid) {
      return NextResponse.json(
        { message: 'Invalid bot token or bot is not accessible' },
        { status: 400 }
      );
    }

    // Create bot instance in database
    const botInstance = await prisma.botInstance.create({
      data: {
        userId: user.id,
        botToken: await botManager.encryptToken(botToken),
        applicationId: applicationId,
        botName: `${user.username}'s Bot`,
        isActive: false,
        pm2ProcessId: null,
        defaultVolume: 50,
        enable247: false,
        enableAutoplay: true,
      },
    });

    // Start bot instance
    const pm2Process = await botManager.startBot(user.id);

    // Update database with PM2 process ID
    await prisma.botInstance.update({
      where: { userId: user.id },
      data: {
        isActive: true,
        pm2ProcessId: pm2Process.pm_id,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Bot setup completed successfully!',
    });
  } catch (error) {
    console.error('Setup API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
