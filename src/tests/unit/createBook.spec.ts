import { createBookService } from "../../services/bookService";
import bookStorage from "../../storage/bookStorage";

const bookService = createBookService(bookStorage);

describe('POST bookService', () => {
    jest.setTimeout(30000);

    beforeEach(() => {
        bookStorage.books = [];
    });

    it('Deve criar um livro e retornar o status', async () => {
        const book = await bookService.createBook({
            title: 'O Alquimista',
            author: 'Paulo Coelho',
            description: 'Um jovem pastor em busca de um tesouro',
            status: 'disponível'
        });

        expect(bookStorage.books).toHaveLength(1);
        expect(book.status).toBe('disponível');
        expect(book.id).toBeTruthy();
        expect(book).toEqual(expect.objectContaining({
            id: expect.any(String),
            title: 'O Alquimista',
            author: 'Paulo Coelho',
            description: 'Um jovem pastor em busca de um tesouro',
            status: 'disponível',
            created_at: expect.any(String)
        }));
    });
});