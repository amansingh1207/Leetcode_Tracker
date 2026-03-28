import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
interface JwtPayload {
  userId: string;
  username: string;
  role: "student" | "admin";
  leetcodeUsername?: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user as JwtPayload;
    next();
  });
}

export function requireRole(role: "admin" | "student") {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (req.user.role !== role) {
      return res.status(403).json({ error: `${role} access required` });
    }

    next();
  };
}

export function requireAdminOrOwnData(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  // Admin can access any data
  if (req.user.role === 'admin') {
    return next();
  }

  // Student can only access their own data
  const requestedUsername = req.params.username;
  if (req.user.role === 'student' && req.user.leetcodeUsername === requestedUsername) {
    return next();
  }

  return res.status(403).json({ error: 'Access denied' });
}

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}