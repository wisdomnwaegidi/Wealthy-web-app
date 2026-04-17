import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import helmet from "helmet";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import updateRoutes from "./routes/updateUser";
import forgotPassword from "./routes/forgotPassword";
import resetPassword from "./routes/resetPassword";
import deleteUser from "./routes/deleteUser";
import studentFees from "./routes/schoolFees";
import studentAssignments from "./routes/assignments";
import subjectRegistration from "./routes/subjectRegistration";
import newsletter from './routes/newsletter'
import mongoose from "mongoose";
import expressSession from "express-session";
import MongoStore from "connect-mongo";
import { v2 as cloudinary } from "cloudinary";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose.connect(process.env.MONGO_URI as string);

const app = express();
const port = Number(process.env.PORT || "5000");

const corsOptions = {
  credentials: true,
  origin: process.env.FRONTEND_URL as string,
  methods: ["POST", "GET", "PUT", "DELETE"],
};

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(helmet());

app.use(
  expressSession({
    name: "session",
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI as string }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  }),
);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/users/assignments", studentAssignments);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/users", updateRoutes);
app.use("/api/users", forgotPassword);
app.use("/api/users", resetPassword);
app.use("/api/users", deleteUser);
app.use("/api/users/subject-registration", subjectRegistration);
app.use("/api/users", newsletter)
app.use("/api/users/fees", studentFees);

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

app.use((req, res, next) => {
  res
    .status(429)
    .json({ message: "Too many login attempts, please try again later" });
});

app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
