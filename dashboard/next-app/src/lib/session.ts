import { type SessionOptions } from 'iron-session';

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'next-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: string;
      username: string;
      avatar: string;
      premiumPlus: boolean;
      premiumTo: Date;
    };
  }
}
