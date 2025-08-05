import { createBookService } from "../../services/bookService";
import bookStorage from "../../storage/bookStorage";

const bookService = createBookService(bookStorage);

describe("DELETE bookService", () => {
    jest.setTimeout(30000);

    beforeEach(() => {
        bookStorage.books = [];
    });

    it("Deve deletar um livro existente", async () => {
        const book = await bookService.createBook({
            title: "1984",
            author: "George Orwell",
            description: "Um romance distópico sobre um regime totalitário",
            status: "disponível"
        });

        const deleted = await bookService.deleteBook(book.id!);

        expect(deleted).toBe(true);
        expect(bookStorage.books).toHaveLength(0);
    });

    it("Deve retornar false ao tentar deletar um livro inexistente", async () => {
        const deleted = await bookService.deleteBook("id-invalido");

        expect(deleted).toBe(false);
    });
});
