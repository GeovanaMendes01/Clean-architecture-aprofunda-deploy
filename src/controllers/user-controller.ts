import { Request, Response } from "express";
import userService from "../services/userService";

export const registerUser = async (req: Request, res: Response): Promise<Response> => {
  const { name, email, password } = req.body;

  try {
    const user = await userService.register({ name, email, password });
    return res.status(201).json({ message: "Usuário registrado com sucesso", user });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  try {
    const token = await userService.login({ email, password });
    return res.status(200).json({ message: "Login realizado com sucesso", token });
  } catch (error: any) {
    return res.status(401).json({ error: error.message });
  }
};