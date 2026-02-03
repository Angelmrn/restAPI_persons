import { prisma } from "../prisma.js";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema.js";

// GET todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET usuario por ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// POST crear usuario
export const CreateUser = async (req, res) => {
  try {
    // Validar con Zod
    const result = createUserSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "validation error",
        errors: result.error.errors,
      });
    }

    // Crear con Prisma
    const user = await prisma.user.create({
      data: result.data,
    });

    return res.status(201).json(user);
  } catch (error) {
    // Error de email duplicado en Prisma
    if (error.code === "P2002") {
      return res.status(409).json({ message: "Email already exists" });
    }
    return res.status(500).json({ message: error.message });
  }
};

// PUT actualizar usuario
export const UpdateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const result = updateUserSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "validation error",
        errors: result.error.errors,
      });
    }

    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: result.data,
    });

    return res.json(user);
  } catch (error) {
    // Prisma error codes
    if (error.code === "P2025") {
      return res.status(404).json({ message: "User not found" });
    }
    if (error.code === "P2002") {
      return res.status(409).json({ message: "Email already exists" });
    }
    return res.status(500).json({ message: error.message });
  }
};

// DELETE eliminar usuario
export const DeleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    return res.sendStatus(204);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(500).json({ message: error.message });
  }
};
