import path from "node:path";
import { ApiError } from "../../utils/api-error/index.js";
import { formatedBook } from "./formatedBook.js";
import { type Book, BookModel } from "../../models/book/index.js";

const booksFilePathname = path.resolve(
  import.meta.dirname,
  "..",
  "..",
  "..",
  "static/books"
);

/**
 * Возвращает список всех книги
 */
export const getAllBooks = async () => {
  const books = await BookModel.find();
  console.log(books);
  return books?.map((book) => formatedBook(book));
};

/**
 * Возвращает книгу по её id
 * @param {string} bookId
 *
 */
export const getBookById = async (bookId: string) => {
  const book = await BookModel.findById(bookId);
  if (book) {
    console.log(book);
    return formatedBook(book);
  }
  throw ApiError.notFound();
};

/**
 * Добавляет новую книгу
 * @param {BookModel<undefined>} book
 *
 */
export const addBook = async (book: Book) => {
  if (book) {
    const createdBook = await BookModel.create(book);
    return formatedBook(createdBook);
  }

  throw ApiError.badRequest();
};

/**
 * Изменяет существующую книгу
 * @param {BookModel<string>['id']} bookId
 * @param {BookModel<undefined>} payload
 *
 */
export const updateBook = async (bookId: string, payload: Partial<Book>) => {
  if (payload) {
    const updatedBook = await BookModel.findByIdAndUpdate(bookId, payload);

    if (updatedBook) {
      return formatedBook(updatedBook);
    }

    throw ApiError.notFound();
  }

  throw ApiError.badRequest();
};

/**
 * Удаляет существующую книгу и файл
 * @param {BookModel<string>['id']} bookId
 *
 */
export const deleteBook = async (bookId: string) => {
  const deletedBook = await BookModel.findByIdAndDelete(bookId);

  if (deletedBook) {
    return formatedBook(deletedBook);
  }

  throw ApiError.notFound();
};

export const getBookFilePath = (fileName: string) => {
  return path.resolve(booksFilePathname, fileName);
};

/**
 *
 * @param {string} bookId
 * @param {import("express-fileupload").UploadedFile} bookFile
 * @param {(pathName: string) => Promise<void> } createFileFn
 * @returns
 */
// export const createBookFile = async (bookId: string, bookFile: UploadedFile, createFileFn: (pathName: string) => Promise<void>) => {
//   if (!bookId) {
//     throw new Error("Id is required");
//   }

//   if (!bookFile) {
//     throw new Error("File is required");
//   }

//   const fileName = `${bookId}.${path.extname(bookFile.name)}`;
//   const filePath = getBookFilePath(fileName);
//   await createFileFn(filePath);
//   return updateBook(bookId, { fileBook: filePath });
// };

/**
 * Функция удаления файла книги из папки
 * @param {string} bookId
 * @returns
 */
// export const removeBookFile = async (bookId) => {
//   if (!bookId) {
//     throw new Error("Id is required");
//   }

//   const book = getBookById(bookId);
//   if (book.fileBook) {
//     await unlink(book.fileBook);
//   }
// };
