import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import logger from "morgan";
import http from "http";
import { Server } from "socket.io";
import { errorController } from "./controllers/errorController";
import { userRoutes } from "./routes/userRoutes";


dotenv.config();

const app = express();

let url: string;
if (process.env.NODE_ENV === "production") {
  app.use(cors({ origin: process.env.FRONTEND_URL }));
  url = process.env.FRONTEND_URL!;
} else {
  app.use(cors());
  url = "http://localhost:5173";
}

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: url,
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

app.use("/api/v1/users", userRoutes);

app.use(errorController);

app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    status: "fail",
    message: "Route not found!",
  });
});

const PORT = 8000 || process.env.PORT;

server.listen(PORT, () => {
  console.log(`Docease server running on port ${PORT}`);
});
