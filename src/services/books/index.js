import path from "node:path";
import { unlink } from "node:fs/promises";
import { Book } from "../../models/book/index.js";
import { ApiError } from "../../utils/api-error/index.js";
import { formatedBook } from "./formatedBook.js";

const booksFilePathname = path.resolve(
  import.meta.dirname,
  "..",
  "..",
  "..",
  "static/books"
);

/**
 * @template T
 * @typedef Book
 * @prop {T} id
 * @prop {string} title
 * @prop {string} description
 * @prop {string} authors
 * @prop {boolean} favorite
 * @prop {string} fileCover
 * @prop {string} fileName
 * @prop {string} fileBook
 */

/**
 * Возвращает список всех книги
 */
export const getAllBooks = async () => {
  const books = await Book.find();
  console.log(books);
  return books?.map((book) => formatedBook(book));
};

/**
 * Возвращает книгу по её id
 * @param {Book<string>['id']} bookId
 *
 */
export const getBookById = async (bookId) => {
  const book = await Book.findById(bookId);
  if (book) {
    console.log(book);
    return formatedBook(book);
  }
  throw ApiError.notFound();
};

/**
 * Добавляет новую книгу
 * @param {Book<undefined>} book
 *
 */
export const addBook = async (book) => {
  if (book) {
    const createdBook = await Book.create(book);
    return formatedBook(createdBook);
  }

  throw ApiError.badRequest();
};

/**
 * Изменяет существующую книгу
 * @param {Book<string>['id']} bookId
 * @param {Book<undefined>} payload
 *
 */
export const updateBook = async (bookId, payload) => {
  if (payload) {
    const updatedBook = await Book.findByIdAndUpdate(bookId, payload);

    if (updatedBook) {
      return formatedBook(updatedBook);
    }

    throw ApiError.notFound();
  }

  throw ApiError.badRequest();
};

/**
 * Удаляет существующую книгу и файл
 * @param {Book<string>['id']} bookId
 *
 */
export const deleteBook = async (bookId) => {
  const deletedBook = await Book.findByIdAndDelete(bookId);
  return formatedBook(deletedBook);
};

export const getBookFilePath = (fileName) => {
  return path.resolve(booksFilePathname, fileName);
};

/**
 *
 * @param {string} bookId
 * @param {import("express-fileupload").UploadedFile} bookFile
 * @param {(pathName: string) => Promise<void> } createFileFn
 * @returns
 */
export const createBookFile = async (bookId, bookFile, createFileFn) => {
  if (!bookId) {
    throw new Error("Id is required");
  }

  if (!bookFile) {
    throw new Error("File is required");
  }

  const fileName = `${bookId}.${path.extname(bookFile.name)}`;
  const filePath = getBookFilePath(fileName);
  await createFileFn(filePath);
  return updateBook(bookId, { fileBook: filePath });
};

/**
 * Функция удаления файла книги из папки
 * @param {string} bookId
 * @returns
 */
export const removeBookFile = async (bookId) => {
  if (!bookId) {
    throw new Error("Id is required");
  }

  const book = getBookById(bookId);
  if (book.fileBook) {
    await unlink(book.fileBook);
  }
};
