import bcrypt from "bcrypt";
import { storage } from "../storage";
import { User, InsertUser } from "@shared/schema";

interface LoginData {
  username: string;
  password: string;
}

interface RegisterData {
  username: string;
  password: string;
  confirmPassword: string;
  role: "student" | "admin";
  leetcodeUsername?: string;
}

interface JwtPayload {
  userId: string;
  username: string;
  role: "student" | "admin";
  leetcodeUsername?: string;
}
import { generateToken } from "../middleware/auth";

export class AuthService {
  private static readonly SALT_ROUNDS = 10;

  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  static async registerUser(data: RegisterData): Promise<{ user: any; token: string }> {
    // Block admin registration - only single admin login is allowed
    if (data.role === "admin") {
      throw new Error("Admin registration is not allowed");
    }

    // Check if username already exists
    const existingUser = await storage.getUserByUsername(data.username);
    if (existingUser) {
      throw new Error("Username already exists");
    }

    // For students, check if LeetCode username is valid
    if (data.role === "student" && data.leetcodeUsername) {
      const existingStudent = await storage.getStudentByUsername(data.leetcodeUsername);
      if (!existingStudent) {
        throw new Error("LeetCode username not found in our student database");
      }
    }

    // Hash password
    const hashedPassword = await this.hashPassword(data.password);

    // Create user
    const user = await storage.createUser({
      username: data.username,
      password: hashedPassword,
      role: data.role,
      leetcodeUsername: data.leetcodeUsername,
    });

    // Generate token
    const tokenPayload: JwtPayload = {
      userId: user.id,
      username: user.username,
      role: user.role as "student" | "admin",
      leetcodeUsername: user.leetcodeUsername || undefined,
    };

    const token = generateToken(tokenPayload);

    return {
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        leetcodeUsername: user.leetcodeUsername,
      },
      token,
    };
  }

  static async loginUser(data: LoginData): Promise<{ user: any; token: string }> {
    // Special case for single admin login
    if (data.username === "admin" && data.password === "leetpeer57") {
      const tokenPayload: JwtPayload = {
        userId: "admin-id",
        username: "admin",
        role: "admin",
      };

      const token = generateToken(tokenPayload);

      return {
        user: {
          id: "admin-id",
          username: "admin",
          role: "admin",
        },
        token,
      };
    }

    // Regular user login
    const user = await storage.getUserByUsername(data.username);
    if (!user) {
      throw new Error("Invalid username or password");
    }

    const isPasswordValid = await this.comparePassword(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid username or password");
    }

    if (!user.isActive) {
      throw new Error("Account is deactivated");
    }

    const tokenPayload: JwtPayload = {
      userId: user.id,
      username: user.username,
      role: user.role as "student" | "admin",
      leetcodeUsername: user.leetcodeUsername || undefined,
    };

    const token = generateToken(tokenPayload);

    return {
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        leetcodeUsername: user.leetcodeUsername,
      },
      token,
    };
  }
}