import express, { Request, Response } from "express";
import User from "../models/user";

const router = express.Router();

// Route to update user details
router.put("/:userId", async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const updatedDetails = req.body;

    // Remove the _id field if it's in the request body
    delete updatedDetails._id;

    const user = await User.findByIdAndUpdate(userId, updatedDetails, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to fetch current user (for demonstration)
router.get("/:userId", async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
