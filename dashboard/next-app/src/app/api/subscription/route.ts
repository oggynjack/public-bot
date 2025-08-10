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
    const dbUser = await prisma.user.findUnique({
      where: { userId: user.id },
    });

    if (!dbUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      plan: dbUser.premiumPlan,
      status: dbUser.premiumPlus ? 'Active' : 'Inactive',
      nextBillingDate: dbUser.premiumTo?.toLocaleDateString(),
    });
  } catch (error) {
    console.error('Subscription GET error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
