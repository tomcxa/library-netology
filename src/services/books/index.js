import path from "node:path";
import { unlink } from "node:fs/promises";
import { v4 } from "uuid";

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
 * @type {Array<Book<string>>} - все нкниги
 */
const books = [
  {
    id: "1",
    title: "string",
    description: "string",
    authors: "string",
    favorite: true,
    fileCover: "string",
    fileName: "string",
  },
  {
    id: "2",
    title: "string",
    description: "string",
    authors: "string",
    favorite: false,
    fileCover: "string",
    fileName: "string",
  },
  {
    id: "3",
    title: "string",
    description: "string",
    authors: "string",
    favorite: true,
    fileCover: "string",
    fileName: "string",
  },
];

/**
 * Возвращает список всех книги
 * @returns {Array<Book<string>>}
 */
export const getAllBooks = () => {
  return books;
};

/**
 * Возвращает книгу по её id
 * @param {Book<string>['id']} bookId
 *
 */
export const getBookById = (bookId) => {
  const book = books.find(({ id }) => id === bookId);
  if (book) {
    return book;
  }
  return;
};

/**
 * Добавляет новую книгу
 * @param {Book<undefined>} book
 *
 */
export const addBook = (book) => {
  if (book) {
    const id = v4();
    const newBook = { id, ...book };
    books.push(newBook);
    return newBook;
  }
};

/**
 * Изменяет существующую книгу
 * @param {Book<string>['id']} bookId
 * @param {Book<undefined>} payload
 *
 */
export const updateBook = (bookId, payload) => {
  const updatingBooksIndex = books.findIndex(({ id }) => id === bookId);
  if (updatingBooksIndex !== -1) {
    books[updatingBooksIndex] = { ...books[updatingBooksIndex], ...payload };
    return books[updatingBooksIndex];
  } else {
    throw new Error("Book not found");
  }
};

/**
 * Удаляет существующую книгу и файл
 * @param {Book<string>['id']} bookId
 *
 */
export const deleteBook = (bookId) => {
  const deletingBookIndex = books.findIndex(({ id }) => bookId === id);
  if (deletingBookIndex !== -1) {
    removeBookFile(bookId);
    books.splice(deletingBookIndex, 1);
    return books;
  }
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
