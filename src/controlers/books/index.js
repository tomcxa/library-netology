import { getBookFilePath } from "../../services/books/index.js";
import {
  addBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "../../services/books/index.js";
import { createBookFile } from "../../services/books/index.js";

class BooksControler {
  static getAll = async (_req, res, next) => {
    try {
      const books = await getAllBooks();
      return res.json(books);
    } catch (error) {
      next(error);
    }
  };

  static getOne = async (req, res, next) => {
    try {
      const { id } = req.params;
      const book = await getBookById(id);

      if (book) {
        return res.json(book);
      }
    } catch (error) {
      next(error);
    }
  };

  static createOne = async (req, res, next) => {
    try {
      const payload = req.body;
      const book = await addBook(payload);
      return res.status(201).json(book);
    } catch (error) {
      next(error);
    }
  };

  static updateOne = (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const newBook = updateBook(id, payload);
    if (newBook) {
      return res.json(newBook);
    }

    return res.status(404).json("Not found");
  };

  static deleteOne = (req, res) => {
    const { id } = req.params;
    const books = deleteBook(id);
    if (books) {
      return res.json(books);
    }

    return res.status(404).json("Not found");
  };

  static uploadFile = async (req, res) => {
    try {
      const { id } = req.params;
      /**
       * @type {import("express-fileupload").UploadedFile}
       */
      const bookFile = req.files.fileBook;
      const updatedBook = await createBookFile(
        id,
        req.files.fileBook,
        bookFile.mv
      );
      return res.json(updatedBook);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error.message);
    }
  };

  static downloadFile = (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json("Id is required");
      }
      const book = getBookById(id);
      res.download(getBookFilePath(book.fileBook), (err) => {
        if (err) {
          throw err;
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error.message);
    }
  };
}

export default BooksControler;
