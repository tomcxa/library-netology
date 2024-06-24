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
  static getAll = (_req, res) => {
    return res.json(getAllBooks());
  };

  static getOne = (req, res) => {
    const { id } = req.params;
    const book = getBookById(id);
    if (book) {
      return res.json(book);
    }
    return res
      .status(404)
      .json({ status: 404, message: `Not found book with id: ${id}` });
  };

  static createOne = (req, res) => {
    const payload = req.body;

    if (payload) {
      return res.status(201).json(addBook(payload));
    }

    return res.status(400).json("Bad request");
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
