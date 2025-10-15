import { JwtPayload } from "jsonwebtoken";

export {}; // Esto hace que sea un módulo

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
      };
    }
  }
}