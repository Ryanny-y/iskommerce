import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/Errors";
import prisma from "../config/client";

export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const adminId = req.userId;

    if (!adminId) {
      throw new CustomError(401, "Unauthorized");
    }

    const admin = await prisma.admin.findUnique({
      where: { id: adminId },
    });

    if (!admin) {
      throw new CustomError(403, "Forbidden: Admin access required");
    }

    next();
  } catch (error) {
    next(error);
  }
};
