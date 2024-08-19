import { Book } from "./models/book/index.js";

export abstract class BookRepository {
  createBook(book: Book) {}
  getBook(id: string) {}
  getBooks() {}
  updateBook(id: string) {}
  deleteBook(id: string) {}
}
