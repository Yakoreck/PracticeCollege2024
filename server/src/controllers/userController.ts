// src/controllers/userController.ts
import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ where: { email } });

  if (userExists) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  console.log(user);

  if (user) {
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

export const authUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (user && (await user.matchPassword(password))) {
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
};

// Редагування користувача
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();

    return res.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ error: "Error updating user" });
  }
};

// Видалення користувача
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();

    return res.json({ message: "User deleted" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ error: "Error deleting user" });
  }
};
