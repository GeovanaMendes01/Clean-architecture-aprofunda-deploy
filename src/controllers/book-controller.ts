import { Request, Response } from 'express';
import { MongoBookRepository } from '../database/MongoBookRepository';
import { createBookService } from '../services/bookService';

const repository = new MongoBookRepository();
const BookService = createBookService(repository);

export const createBook = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { title, author, description, status } = req.body;
    const newBook = await BookService.createBook({ title, author, description, status });
    return res.status(201).json({ 
      message: `Livro '${newBook.title}' criado com sucesso!`,
      book: newBook 
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const listBooks = async (req: Request, res: Response): Promise<Response> => {
  try {
    const books = await BookService.getAllBooks();
    return res.json(books);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateBook = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const data = req.body;

  try {
    const updatedBook = await BookService.updateBook(id, data);
    if (!updatedBook) {
      return res.status(404).json({ message: 'Livro não encontrado!' });
    }
    return res.status(200).json({ message: `Livro '${updatedBook.title}' atualizado com sucesso!` });
  } catch (error: any) {
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Livro não encontrado!' });
    }
    return res.status(500).json({ error: error.message });
  }
};

export const deleteBook = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const deleted = await BookService.deleteBook(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Livro não encontrado!' });
    }
    return res.status(200).json({ message: 'Livro removido com sucesso!' });
  } catch (error: any) {
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Livro não encontrado!' });
    }
    return res.status(500).json({ error: error.message });
  }
};