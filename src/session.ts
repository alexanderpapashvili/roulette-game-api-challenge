import 'express-session';
import { JwtPayload } from 'jsonwebtoken';

declare module 'express-session' {
  interface SessionData {
    gameMode: 'NORMAL' | 'TESTING';
    startingBalance: number;
    currentBalance: number;
  }
}

export const sess = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
};
