import { JwtPayload } from "jsonwebtoken";
import { Book } from "../../models/book-model";

declare global {
    namespace Express {
        interface Request {

            book?: Book | JwtPayload;
        }
    }
}


export {};