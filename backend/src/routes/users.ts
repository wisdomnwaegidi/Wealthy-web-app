import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import { sendVerificationEmail } from "../utils/mailer";
import passport from "../config/passport";
import verifyToken from "../middleware/auth";
import crypto from "crypto";

const router = express.Router();

// Initialize passport
router.use(passport.initialize());

// Google OAuth
router.get(
  "/auth/google",
  (req, res, next) => {
    console.log("Callback URL:", process.env.GOOGLE_CALLBACK_URL as string); // ← add this
    next();
  },
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL as string}/register`,
    session: false,
  }),
  (req, res) => {
    const user = req.user as any;
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      },
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });

    // Redirect to complete profile if fields are still "Pending"
    if (user.childFirstName === "Pending") {
      return res.redirect(`${process.env.FRONTEND_URL}/complete-profile`);
    }

    res.redirect(
      `${process.env.FRONTEND_URL}/student-dashboard/dashboard-index`,
    );
  },
);

router.put(
  "/complete-profile",
  verifyToken, // must be logged in via cookie
  async (req: Request, res: Response) => {
    try {
      const {
        childFirstName,
        childSurname,
        childAge,
        homeAddress,
        parentNames,
        stateOfOrigin,
        childClass,
      } = req.body;

      const user = await User.findByIdAndUpdate(
        req.userId, // set by verifyToken middleware
        {
          childFirstName,
          childSurname,
          childAge,
          homeAddress,
          parentNames,
          stateOfOrigin,
          childClass,
        },
        { new: true, runValidators: true },
      );

      if (!user) return res.status(404).json({ message: "User not found" });

      return res
        .status(200)
        .json({ message: "Profile completed successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
);

// Get user profile
router.get("/me", verifyToken, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// User registration
router.post(
  "/register",
  [
    check("childFirstName", "Child first name is required").notEmpty().trim(),
    check("childSurname", "Child surname is required").notEmpty().trim(),
    check("childAge", "Child age is required")
      .isInt({ min: 0, max: 30 })
      .toInt(),
    check("homeAddress", "Home address is required").notEmpty().trim(),
    check("parentNames", "Parents name is required").notEmpty().trim(),
    check("stateOfOrigin", "State of origin is required").notEmpty().trim(),
    check("childClass", "Child class is required").notEmpty().trim(),
    check("parentsEmail", "Valid parent's email is required")
      .isEmail()
      .toLowerCase(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // { parentsEmail: req.body.parentsEmail }
    try {
      console.log(
        "childAge type:",
        typeof req.body.childAge,
        "value:",
        req.body.childAge,
      );

      const { parentsEmail } = req.body;

      let user = await User.findOne({ parentsEmail });

      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      const verificationToken = crypto.randomBytes(32).toString("hex");

      user = new User({
        ...req.body,
        verificationToken,
        isVerified: false,
      });

      await user.save();

      await sendVerificationEmail(user.parentsEmail, verificationToken);

      return res.status(200).json({
        message:
          "User registered. Please check your email for the verification link.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
);

// Email verification token
router.get("/verify-email/:token", async (req: Request, res: Response) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification token" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    const jwtToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1d" },
    );

    res.cookie("auth_token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });

    res.redirect(`${process.env.FRONTEND_URL as string}/login`);
  } catch (error) {
    console.error("Error during verification:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
