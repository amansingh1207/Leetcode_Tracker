import { Router } from "express";
import { AuthService } from "../services/auth";
import { authenticateToken } from "../middleware/auth";

const authRouter = Router();

// Register a new user
authRouter.post("/register", async (req, res) => {
  try {
    const result = await AuthService.registerUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error("Registration error:", error);
    res.status(400).json({ error: error instanceof Error ? error.message : "Registration failed" });
  }
});

// Login user
authRouter.post("/login", async (req, res) => {
  try {
    const result = await AuthService.loginUser(req.body);
    res.json(result);
  } catch (error) {
    console.error("Login error:", error);
    res.status(401).json({ error: error instanceof Error ? error.message : "Login failed" });
  }
});

// Get current user profile (protected route)
authRouter.get("/me", authenticateToken, (req, res) => {
  res.json({
    user: {
      id: req.user!.userId,
      username: req.user!.username,
      role: req.user!.role,
      leetcodeUsername: req.user!.leetcodeUsername,
    },
  });
});

// Logout user (client-side token removal)
authRouter.post("/logout", (req, res) => {
  res.json({ message: "Logged out successfully" });
});

export default authRouter;