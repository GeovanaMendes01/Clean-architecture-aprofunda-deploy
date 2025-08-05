import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectMongo } from "../../src/database/mongooseConection";
import { BookModel } from "../../src/database/mongooseBookModel";

dotenv.config({ path: ".env.test" });

beforeAll(async () => {
  await connectMongo(process.env.MONGO_URI!);
});

beforeEach(async () => {
  await BookModel.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});