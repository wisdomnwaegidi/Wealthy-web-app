// backend/src/middleware/auth.ts
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extend the Request interface to include userId
declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

interface DecodedToken extends JwtPayload {
  userId: string;
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Try to get token from cookies first, then Authorization header
    let token = req.cookies["auth_token"];

    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access token is required",
      });
    }

    // Verify the token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as DecodedToken;

    if (!decoded.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token format",
      });
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: "Token has expired",
      });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    } else {
      console.error("Auth middleware error:", error);
      return res.status(401).json({
        success: false,
        message: "Authentication failed",
      });
    }
  }
};

export default verifyToken;
