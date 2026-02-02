import express from "express";
import usersRoutes from "./routes/users.routes.js";
import morgan from "morgan";

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(usersRoutes);
const PORT = process.env.PORT || 1234;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
