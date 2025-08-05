/// <reference path="../@types/express/index.d.ts" />

import express from "express";
import { createBook, listBooks, updateBook, deleteBook } from "../controllers/book-controller";
import { AuthController } from "../controllers/AuthController";
import { autenticar } from "../shared/middleware/authMiddleware";

const authController = new AuthController();
const router = express.Router();

router.post("/books", autenticar, createBook);
router.get("/books", autenticar,  listBooks);
router.patch("/books/:id", autenticar, updateBook);
router.delete("/books/:id", autenticar, deleteBook);

router.post("/verificar", (req, res) => authController.verificar(req, res));

router.get("/me", autenticar, async(req, res) => {
  await res.json({message: "Rota protegida", book: req.book}) 
});

export default router;