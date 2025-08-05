import { createBookService } from "../../services/bookService";
import bookStorage from "../../storage/bookStorage";

const bookService = createBookService(bookStorage);

describe('GET bookService', () => {
    jest.setTimeout(30000);

    beforeEach(() => {
        bookStorage.books = [];
    });

    it('Deve retornar todos os livros criados', async () => {
        await bookService.createBook({
            title: 'O Alquimista',
            author: 'Paulo Coelho',
            description: 'Um jovem pastor em busca de um tesouro',
            status: 'disponível'
        });

        const listBookCreated = await bookService.getAllBooks();

        expect(listBookCreated[0].title).toBe('O Alquimista');
    });
});