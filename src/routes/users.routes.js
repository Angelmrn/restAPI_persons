import { Router } from "express";
import {
  getUsers,
  getUserById,
  CreateUser,
  UpdateUser,
  DeleteUser,
} from "../controllers/users.controllers.js";

const router = Router();
//GET
router.get("/users", getUsers);
//GET by ID
router.get("/users/:id", getUserById);

//POST
router.post("/users", CreateUser);

//PUT
router.put("/users/:id", UpdateUser);

//DELETE
router.delete("/users/:id", DeleteUser);

export default router;
