import { Schema, model, Types } from "mongoose";

const assignmentSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    subject: { type: String, required: true },
    assignment: { type: String, required: true },
    dueDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["completed", "Pending", "Not Started"],
      default: "Not Started",
    },
    questions: [
      {
        questionNumber: Number,
        questionText: String,
        options: [
          {
            optionText: String,
            isCorrect: Boolean,
          },
        ],
      },
    ],
    submittedAnswers: [
      {
        questionNumber: Number,
        answer: String,
        isCorrect: Boolean,
      },
    ],
  },
  { timestamps: true }
);

export default model("Assignments", assignmentSchema);
