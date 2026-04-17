import { Router, Request, Response } from "express";
import Assignments from "../models/assignments";
import verifyToken from "../middleware/auth";

const router = Router();

// GET all assignments for current user
router.get("/", verifyToken, async (req: Request, res: Response) => {
  console.log("GET /api/users/assignments called with userId:", req.userId);
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const assignments = await Assignments.find({ userId: req.userId });
    console.log("Found assignments:", assignments.length); // Add this
    console.log("Assignments data:", assignments); // Add this to see actual data
    res.json(assignments);
  } catch (error) {
    console.error("Error fetching assignments:", error);
    res.status(500).json({ error: "Failed to fetch assignments" });
  }
});

// GET single assignment by ID
router.get(
  "/:assignmentId",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      if (!req.userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const assignment = await Assignments.findOne({
        _id: req.params.assignmentId,
        userId: req.userId,
      });

      if (!assignment) {
        return res.status(404).json({ error: "Assignment not found" });
      }

      res.json(assignment);
    } catch (error) {
      console.error("Error fetching assignment:", error);
      res.status(500).json({ error: "Failed to fetch assignment" });
    }
  }
);

// POST submit assignment
router.post(
  "/:assignmentId/submit",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      if (!req.userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { answers } = req.body; // [{ questionNumber, answer }]
      const assignment = await Assignments.findOne({
        _id: req.params.assignmentId,
        userId: req.userId,
      });

      if (!assignment) {
        return res.status(404).json({ error: "Assignment not found" });
      }

      if (assignment.status === "completed") {
        return res.status(400).json({ error: "Assignment already completed" });
      }

      // Check correctness and calculate score
      const submittedAnswers = answers.map((ans: any) => {
        const question = assignment.questions.find(
          (q: any) => q.questionNumber === ans.questionNumber
        );

        const isCorrect =
          question?.options.some(
            (opt: any) => opt.optionText === ans.answer && opt.isCorrect
          ) || false;

        return {
          questionNumber: ans.questionNumber,
          answer: ans.answer,
          isCorrect,
        };
      });

      // Calculate score
      const totalQuestions = assignment.questions.length;
      const correctAnswers = submittedAnswers.filter(
        (ans: any) => ans.isCorrect
      ).length;
      const score = Math.round((correctAnswers / totalQuestions) * 100);

      // Update assignment - let Mongoose handle the array conversion
      assignment.submittedAnswers = submittedAnswers;

      // Update assignment
      assignment.submittedAnswers = submittedAnswers;
      assignment.status = "completed";
      await assignment.save();

      res.json({
        message: "Assignment submitted successfully",
        score,
        correctAnswers,
        totalQuestions,
        submittedAnswers,
      });
    } catch (error) {
      console.error("Error submitting assignment:", error);
      res.status(500).json({ error: "Failed to submit assignment" });
    }
  }
);

export default router;
