import type { RequestHandler } from "express";
import { inject, injectable } from "inversify";
import { BooksService } from "../../services/books/index.js";

@injectable()
class BooksControler {
  constructor(@inject(BooksService) private readonly service: BooksService) {
    this.service = service;
  }

  getAll: RequestHandler = async (_req, res, next) => {
    try {
      const books = await this.service.getAllBooks();
      return res.json(books);
    } catch (error) {
      next(error);
    }
  };

  getOne: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const book = await this.service.getBookById(id);

      if (book) {
        return res.json(book);
      }
    } catch (error) {
      next(error);
    }
  };

  createOne: RequestHandler = async (req, res, next) => {
    try {
      const payload = req.body;
      const book = await this.service.addBook(payload);
      return res.status(201).json(book);
    } catch (error) {
      next(error);
    }
  };

  updateOne: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const newBook = await this.service.updateBook(id, payload);
    if (newBook) {
      return res.json(newBook);
    }

    return res.status(404).json("Not found");
  };

  deleteOne: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const books = await this.service.deleteBook(id);
    if (books) {
      return res.json(books);
    }

    return res.status(404).json("Not found");
  };
}

export default BooksControler;
