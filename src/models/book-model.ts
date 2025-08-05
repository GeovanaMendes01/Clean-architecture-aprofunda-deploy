export class Book {
  title: string;
  author: string;
  status: string;
  description: string;
  created_at: string;

  constructor({
    title,
    author,
    status,
    description,
    created_at,
  }: {
    title: string;
    author: string;
    status: string;
    description: string;
    created_at: string;
  }) {
    this.title = title;
    this.author = author;
    this.status = status;
    this.description = description;
    this.created_at = created_at;
  }
}