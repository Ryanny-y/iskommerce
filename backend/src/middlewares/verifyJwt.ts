import { UserRole } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt, {
  JsonWebTokenError,
  JwtPayload,
  TokenExpiredError,
} from "jsonwebtoken";

interface AccessTokenPayload extends JwtPayload {
  sub: string;
  role: UserRole;
}

const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (typeof authHeader !== "string") {
    return res.sendStatus(401);
  }

  const [scheme, accessToken] = authHeader.split(" ");

  if (scheme !== "Bearer" || !accessToken) {
    return res.sendStatus(401);
  }

  try {
    const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as AccessTokenPayload;

    req.userId = payload.sub;
    req.userRole = payload.role;

    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({
        message: "Access token expired",
      });
    }

    if (error instanceof JsonWebTokenError) {
      return res.status(403).json({
        message: "Invalid access token",
      });
    }

    next(error);
  }
};

export default verifyJwt;