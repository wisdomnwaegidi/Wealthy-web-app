import { Schema, model, models, Document } from "mongoose";

interface UserType extends Document {
  parentsEmail: string;
  password: string;
  resetToken?: string | undefined;
  resetTokenExpiry?: Date | undefined;
}

const userSchema = new Schema<UserType>({
  password: { type: String, required: true },
  parentsEmail: { type: String, required: true },
  resetToken: { type: String },
  resetTokenExpiry: { type: Date },
});

const User = models.User || model<UserType>("User", userSchema);

export default User;
export { UserType };
