import { Schema, model } from "mongoose";
import { UserType } from "../shared/typesLogin";
import bcrypt from "bcryptjs";

const loginSchema = new Schema(
  {
    parentsEmail: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    keepMeSignedIn: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

loginSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = model<UserType>("User", loginSchema);
export default User;
