import { Schema, model, Types } from "mongoose";

const subjectRegistrationSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    term: {
      type: String,
      enum: ["First Term", "Second Term", "Third Term"], 
      required: true,
    },
    childClass: {
      type: String,
      enum: [
        "Primary 1",
        "Primary 2",
        "Primary 3",
        "Primary 4",
        "Primary 5",
        "Primary 6",
      ],
      required: true,
    },
    subjects: {
      type: [String], 
      required: true,
    },
  },
  { timestamps: true }
);

const SubjectRegistration = model(
  "SubjectRegistration",
  subjectRegistrationSchema
);

export default SubjectRegistration;
