import express from "express";
import usersRoutes from "./routes/users.routes.js";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middlewares
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  }),
);
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", usersRoutes);

// Puerto
const PORT = process.env.PORT || 1234;

app.listen(PORT, () => {
  console.log(`servidor levantado en el puerto http://localhost:${PORT}`);
});
