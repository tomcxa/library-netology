import { Schema, model, Document } from "mongoose";

export type Book = {
  title: string;
  description: string;
  authors: string;
  favorite: string;
  fileCover: string;
  fileName: string;
};

const bookSchemaDefenition = {
  title: { type: String, required: true },
  description: { type: String, default: "" },
  authors: { type: String, default: "" },
  favorite: { type: String, default: "" },
  fileCover: { type: String, default: "" },
  fileName: { type: String, default: "" },
};

const bookSchema = new Schema<Book>(bookSchemaDefenition, { id: false });

export const BookModel = model("Book", bookSchema);

export type BookDbModel = typeof BookModel;

export type BookMongooseDoc = Document<unknown, {}, Book>;
