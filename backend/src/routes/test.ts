import express, { Request, Response } from "express";
import User from "../models/user";

const router = express.Router();

router.get("/test", async (req: Request, res: Response) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

export default router;
