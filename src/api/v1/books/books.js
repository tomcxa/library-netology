import { Router } from "express";
import {
  addBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "../../../services/books/books.js";

export const booksRouter = Router();

booksRouter.get("/books", (_req, res) => {
  res.json(getAllBooks());
});

booksRouter.get("/books/:id", (req, res) => {
  const { id } = req.params;
  const book = getBookById(id);
  if (book) {
    res.json(book);
  }
  res.status(404).json(`Not found book with id: ${id}`);
});

booksRouter.post("/books", (req, res) => {
  const payload = req.body;

  if (payload) {
    res.json(addBook(payload));
  }

  res.status(400).json("Bad request");
});

booksRouter.patch("/books/:id", (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const newBook = updateBook(id, payload);
  if (newBook) {
    res.json(newBook);
  }

  res.status(404).json("Not found");
});

booksRouter.delete("/books/:id", (req, res) => {
  const { id } = req.params;
  const books = deleteBook(id);
  if (books) {
    res.json(books);
  }

  res.status(404).json("Not found");
});
