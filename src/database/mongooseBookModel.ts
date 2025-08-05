import {Schema, model} from "mongoose";

const bookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    status: { type: String, required: true },
    description: { type: String, required: true },
    created_at: { type: String, required: true },
})


export const BookModel = model('Book', bookSchema); 

