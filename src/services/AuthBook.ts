import { IBookRepository } from "../repositories/IBookRepository";
import { gerarToken } from "../shared/helper/jwt";

interface IAuthImput{
    id: string,
    author: string;
}

export class AuthBook {
    constructor(private bookRepository: IBookRepository) {}

    async execute({ id, author }: IAuthImput): Promise<string> {
        const book = await this.bookRepository.findById(id);

        if(!book || book.author != author){
            throw new Error("Credenciais inválidas");
        }

        const token = gerarToken({ bookId: book.id, author: book.author });

        return token;

    }
}