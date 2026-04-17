import express, { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import auth from "../middleware/auth"; // Assuming you have an auth middleware
import User from "../models/user";

const router = express.Router();

router.delete("/delete/:id", auth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isActive) {
      return res.status(400).json({ message: "User already deleted" });
    }

    user.isActive = false;
    user.deletedAt = new Date();
    await user.save();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
