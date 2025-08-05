import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Book } from '../../models/book-model';

const JWT_SECRET = process.env.JWT_SECRET|| 'undefined';

export function autenticar(req: Request, res: Response, nextFunction: NextFunction){
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(401).json({ error: 'Token não enviado' });
        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.book = payload as Book;
        nextFunction();
    } catch{
        res.status(401).json({ message: 'Token inválido' });
        return;
    }

}