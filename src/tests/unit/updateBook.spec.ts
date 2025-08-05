import { createBookService } from "../../services/bookService";
import bookStorage from "../../storage/bookStorage";

const bookService = createBookService(bookStorage);

describe("PATCH bookService", () => {
    jest.setTimeout(30000);

    beforeEach(() => {
        bookStorage.books = [];
    });

    it("Deve atualizar o status de um livro existente", async () => {
        const book = await bookService.createBook({
            title: "O Alquimista",
            author: "Paulo Coelho",
            description: "Um jovem pastor em busca de um tesouro",
            status: "disponível"
        });
        
        const updatedBook = await bookService.updateBook(book.id!, {
            status: "emprestado"
        });
        
        expect(updatedBook).not.toBeNull();
        expect(updatedBook?.status).toBe("emprestado");
    });

    it("Deve retornar null se o livro não for encontrado", async () => {
        const updated = await bookService.updateBook("id-invalido", {
            status: "emprestado"
        });

        expect(updated).toBeNull();
    });
});