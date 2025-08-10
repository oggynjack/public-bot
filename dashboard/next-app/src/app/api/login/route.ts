import { getIronSession } from 'iron-session';
import { sessionOptions } from '@/lib/session';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getIronSession(cookies(), sessionOptions);

  session.user = {
    id: 'clvyrf70x0000828srp45g5b7',
    username: 'test',
    avatar: 'test',
    premiumPlus: true,
    premiumTo: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  };

  await session.save();

  return NextResponse.json({ message: 'Logged in' });
}
