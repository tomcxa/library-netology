import { Schema, model } from "mongoose";

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    authors: { type: String, default: "" },
    favorite: { type: String, default: "" },
    fileCover: { type: String, default: "" },
    fileName: { type: String, default: "" },
  },
  { id: false }
);

export const Book = model("Book", bookSchema);
