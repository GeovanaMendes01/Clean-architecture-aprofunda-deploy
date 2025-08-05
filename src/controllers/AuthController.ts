import {IBookRepository } from "../repositories/IBookRepository";
import { Request, Response } from "express";
import { AuthBook } from "../services/AuthBook";
import { verificarToken } from "../shared/helper/jwt";

export class AuthController {
    async handle(req: Request, res: Response): Promise<Response>{
        

        const { id, author } = req.body;
        try{
            const authBook = new AuthBook(req.app.get('bookRepository') as IBookRepository);
            

            const token = await authBook.execute({id, author});
            return res.status(200).json({ token });

        }catch(e: any){
            return res.status(401).json({ error: e.message });
        }

    }

    async verificar(req: Request, res: Response): Promise<Response> {
    const { id, author } = req.body;

    if (!id || !author) {
        return res.status(400).json({ error: "ID e author são obrigatórios" });
    }

    try {
        const authBook = new AuthBook(req.app.get('bookRepository') as IBookRepository);
        const token = await authBook.execute({ id, author });

        return res.status(200).json({ token });
    } catch (e: any) {
        return res.status(401).json({ error: e.message });
    }
}
}