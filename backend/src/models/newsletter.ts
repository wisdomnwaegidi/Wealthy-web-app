import { Schema, model, models, Document } from "mongoose";

interface UserType extends Document {
  Email: string;
}

const userSchema = new Schema<UserType>({
  Email: { type: String, required: true },
});

const User =
  models.NewsletterUser || model<UserType>("NewsletterUser", userSchema);

export default User;
export { UserType };
