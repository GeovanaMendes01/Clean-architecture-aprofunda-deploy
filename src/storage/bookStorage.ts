export interface BookData {
  id?: string;
  title: string;
  author: string;
  description: string;
  status: string;
  created_at: string;
}

import { IBookRepository } from '../repositories/IBookRepository';

export class BookStorage implements IBookRepository {
  private static instance: BookStorage;
  public books: BookData[] = [];

  private constructor() {}

  public static getInstance(): BookStorage {
    if (!BookStorage.instance) {
      BookStorage.instance = new BookStorage();
    }
    return BookStorage.instance;
  }

  async add(book: BookData): Promise<BookData> {
    this.books.push(book);
    return book;
  }

  async getAll(): Promise<BookData[]> {
    return this.books;
  }

  async update(id: string, data: Partial<BookData>): Promise<BookData | null> {
    const index = this.books.findIndex(book => book.id === id);
    if (index === -1) return null;

    this.books[index] = {
      ...this.books[index],
      ...data,
    };

    return this.books[index];
  }

  async delete(id: string): Promise<boolean> {
    const index = this.books.findIndex(book => book.id === id);
    if (index === -1) return false;

    this.books.splice(index, 1);
    return true;
  }

  async findById(id: string): Promise<BookData | null> {
  return this.books.find(book => book.id === id) || null;
  }
}

export default BookStorage.getInstance();