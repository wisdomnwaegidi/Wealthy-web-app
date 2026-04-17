export type UserType = {
  _id: string;
  parentsEmail: string;
  password: string;
  resetToken?: string;
  resetTokenExpiry?: number;
};
