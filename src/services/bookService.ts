import { IBookRepository } from '../repositories/IBookRepository';
import crypto from 'crypto';

interface BookData {
  title: string;
  author: string;
  description: string;
  status: string;
}

interface Book extends BookData {
  id: string;
  created_at: string;
}

export const createBookService = (repository: IBookRepository) => ({
  createBook: async ({ title, author, description, status }: BookData): Promise<Book> => {
    const newBook: Book = {
      id: crypto.randomUUID(),
      title,
      author,
      description,
      status,
      created_at: new Date().toLocaleDateString('pt-BR'),
    };

    const createdBook = await repository.add(newBook);
    return createdBook as Book;
  },

  getAllBooks: async (): Promise<Book[]> => {
    return (await repository.getAll()) as Book[];
  },

  updateBook: async (id: string, data: Partial<BookData>): Promise<Book | null> => {
    return (await repository.update(id, data)) as Book | null;
  },

  deleteBook: async (id: string): Promise<boolean> => {
    return await repository.delete(id);
  },
});