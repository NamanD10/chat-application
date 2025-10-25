import express from 'express';
import { connectDB } from './lib/db.js';
import cookieParser from "cookie-parser";
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import chatRoutes from './routes/chat.route.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
    res.send("hello from chat and video call application");
});

app.listen(3000, () => {
    console.log(`Server listening on Port ${PORT}`);
    connectDB();
});