import { Router, Request, Response } from "express";
import SubjectRegistration from "../models/subjectRegistration";
import verifyToken from "../middleware/auth";
import { check, validationResult } from "express-validator";

const router = Router();

// POST /api/subject-registration
router.post(
  "/",
  [
    check("childClass", "Child class is required").notEmpty().trim(),
    check("term", "Term is required").notEmpty().trim(),
    check("Subjects", "Subjects is required").notEmpty().trim(),
  ],
  verifyToken,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      if (!req.userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { childClass, term, subjects } = req.body;

      /*   if (
        !childClass ||
        !term ||
        !subjects ||
        !Array.isArray(subjects) ||
        subjects.length === 0
      ) {
        return res
          .status(400)
          .json({ error: "childClass, term, and subjects are required" });
      } */

      // OPTION 1: Check if user already has a registration for this class and term
      const existingRegistration = await SubjectRegistration.findOne({
        user: req.userId,
        childClass,
        term,
      });

      if (existingRegistration) {
        return res.status(409).json({
          message:
            "You have already registered subjects for this class and term",
          existingRegistration: existingRegistration,
        });
      }

      // Create new registration if no existing one found
      const newRegistration = new SubjectRegistration({
        user: req.userId,
        childClass,
        term,
        subjects,
      });

      await newRegistration.save();
      res.status(201).json({
        message: "Subject registration created successfully",
        registration: newRegistration,
      });
    } catch (error: any) {
      console.error("Registration error:", error);
      res.status(400).json({ error: error.message });
    }
  },
);

// GET /api/subject-registration/:userId
router.get("/:userId", verifyToken, async (req: Request, res: Response) => {
  try {
    // Authorization check - users can only view their own registrations
    if (req.userId !== req.params.userId) {
      return res.status(403).json({
        message: "You can only view your own subject registrations",
      });
    }

    const registrations = await SubjectRegistration.find({
      user: req.params.userId,
    }).populate("user");

    res.json(registrations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/subject-registration/:registrationId - Update existing registration
router.put(
  "/:registrationId",
  check("Subjects", "Subjects is required").notEmpty().trim(), // ✅ Correct
  verifyToken,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      if (!req.userId) {
        return res.status(401).json({ mesage: "Unauthorized" });
      }

      const { subjects } = req.body;

      /* if (!subjects || !Array.isArray(subjects) || subjects.length === 0) {
        return res.status(400).json({
          message: "Subjects are required and must be a non-empty array",
        });
      } */

      const registration = await SubjectRegistration.findOne({
        _id: req.params.registrationId, // ✅ Use registrationId, not userId
        user: req.userId,
      });

      if (!registration) {
        return res.status(404).json({
          message:
            "Registration not found or you don't have permission to update it",
        });
      }

      registration.subjects = subjects;

      await registration.save();

      res.json({
        message: "Subject registration updated successfully",
        registration: registration,
      });
    } catch (error: any) {
      console.error("Update error:", error);
      res.status(500).json({ message: error.message });
    }
  },
);

// DELETE /api/subject-registration/:registrationId
router.delete(
  "/:registrationId",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      if (!req.userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const registration = await SubjectRegistration.findOneAndDelete({
        _id: req.params.registrationId,
        user: req.userId,
      });

      if (!registration) {
        return res.status(404).json({
          error:
            "Registration not found or you don't have permission to delete it",
        });
      }

      res.json({ message: "Registration deleted successfully" });
    } catch (error: any) {
      console.error("Delete error:", error);
      res.status(500).json({ error: error.message });
    }
  },
);

export default router;
