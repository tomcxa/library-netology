import type { BookMongooseDoc } from "../../models/book/index.ts";

export const formatedBook = (book: BookMongooseDoc) => {
  const { _id, ...otherFields } = book.toObject();
  return { id: _id, ...otherFields };
};
