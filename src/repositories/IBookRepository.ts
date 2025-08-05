import { BookData } from '../storage/bookStorage';

export interface IBookRepository {
  add(book: Omit<BookData, 'id'>): Promise<BookData>;
  getAll(): Promise<BookData[]>;
  update(id: string, data: Partial<BookData>): Promise<BookData | null>;
  delete(id: string): Promise<boolean>;
  findById(id: string): Promise<BookData | null>;
}