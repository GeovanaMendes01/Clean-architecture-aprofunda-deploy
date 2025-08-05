import { BookData } from '../storage/bookStorage';
import { BookModel } from './mongooseBookModel';
import { IBookRepository } from '../repositories/IBookRepository';
import mongoose from 'mongoose';

export class MongoBookRepository implements IBookRepository {
  private toEntity(doc: any): BookData {
    return {
      id: doc._id.toString(),
      title: doc.title,
      author: doc.author,
      description: doc.description,
      status: doc.status,
      created_at: doc.created_at,
    };
  }

  async add(book: Omit<BookData, 'id'>): Promise<BookData> {
    const newBook = await BookModel.create(book);
    return this.toEntity(newBook);
  }

  async getAll(): Promise<BookData[]> {
    const books = await BookModel.find();
    return books.map((doc) => this.toEntity(doc));
  }

  async update(id: string, data: Partial<BookData>): Promise<BookData | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;  
    const updated = await BookModel.findByIdAndUpdate(id, data, { new: true });
    return updated ? this.toEntity(updated) : null;
  }

  async delete(id: string): Promise<boolean> {
    if (!mongoose.Types.ObjectId.isValid(id)) return false; 
    const result = await BookModel.findByIdAndDelete(id);
    return !!result;
  }

  async findById(id: string): Promise<BookData | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null; 
    const book = await BookModel.findById(id);
    return book ? this.toEntity(book) : null;
  }
}