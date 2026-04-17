import { Schema, model } from "mongoose";
import { UserType } from "../shared/types";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    childFirstName: {
      type: String,
      required: true,
    },
    childSurname: {
      type: String,
      required: true,
    },
    childAge: {
      type: Number,
      required: true,
    },
    homeAddress: {
      type: String,
      required: true,
    },
    parentNames: {
      type: String,
      required: true,
    },
    stateOfOrigin: {
      type: String,
      required: true,
    },
    childClass: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["parent", "admin"],
      default: "parent",
    },
    parentsEmail: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    parentsPhone: {
      type: String,
      validate: {
        validator: function (phoneNumber: string) {
          // Nigerian phone number validation (basic)
          return !phoneNumber || /^(\+234|0)[789][01]\d{8}$/.test(phoneNumber);
        },
        message: "Please enter a valid Nigerian phone number",
      },
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    fees: {
      type: Number,
      default: 0,
    },
    verificationToken: {
      type: String,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetToken: {
      type: String,
      default: null,
    },
    resetTokenExpiry: {
      type: Date,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    outstandingFees: {
      type: Number,
      default: 0,
    },
    subscribed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = model<UserType>("User", userSchema);
export default User;
