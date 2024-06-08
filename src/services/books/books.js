import { v4 } from "uuid";

/**
 * @template T
 * @typedef Book
 * @prop {T} id
 * @prop {string} title
 * @prop {string} description
 * @prop {string} authors
 * @prop {string} favorite
 * @prop {string} fileCover
 * @prop {string} fileName
 */

/**
 * @type {Array<Book<string>>} - все нкниги
 */
const books = [];

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
  return books.find(({ id }) => id === bookId);
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
    return books;
  }
};

/**
 * Удаляет существующую книгу
 * @param {Book<string>['id']} bookId
 *
 */
export const deleteBook = (bookId) => {
  const deletingBookIndex = books.findIndex(({ id }) => bookId === id);
  console.log(bookId, deletingBookIndex);
  if (deletingBookIndex !== -1) {
    books.splice(deletingBookIndex, 1);
    return books;
  }
};
