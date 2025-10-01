import { JwtPayload } from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    user?: string | JwtPayload;
  }
} // ASI EXPRESS YA SABE QUE CREAMOS UN ARCHIVO USER CON EL REQ.USER