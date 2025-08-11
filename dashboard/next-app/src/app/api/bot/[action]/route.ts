import { getIronSession } from 'iron-session';
import { sessionOptions } from '@/lib/session';
import { cookies } from 'next/headers';
import { BotManager } from '@/lib/BotManager';
import { NextResponse } from 'next/server';

const botManager = new BotManager();

export async function POST(
  request: Request,
  { params }: { params: { action: string } }
) {
  const session = await getIronSession(await cookies(), sessionOptions);
  const user = session.user;

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const action = params.action;

  try {
    switch (action) {
      case 'start':
        await botManager.startBot(user.id);
        break;
      case 'stop':
        await botManager.stopBot(user.id);
        break;
      case 'restart':
        await botManager.restartBot(user.id);
        break;
      default:
        return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
    }

    return NextResponse.json({ message: `Bot ${action}ed successfully` });
  } catch (error) {
    console.error(`Bot control error (${action}):`, error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
