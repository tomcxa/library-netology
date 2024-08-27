import { ApiError } from "../../utils/api-error/index.js";
import type {
  Book,
  BookDbModel,
  BookMongooseDoc,
} from "../../models/book/index.js";
import { injectable } from "inversify";

@injectable()
export class BooksService {
  constructor(private readonly bookModel: BookDbModel) {
    this.bookModel = bookModel;
  }
  /**
   * Возвращает список всех книги
   */
  getAllBooks = async () => {
    const books = await this.bookModel.find();
    return books?.map((book) => this.formatedBook(book));
  };

  /**
   * Возвращает книгу по её id
   * @param {string} bookId
   *
   */
  getBookById = async (bookId: string) => {
    const book = await this.bookModel.findById(bookId);
    if (book) {
      return this.formatedBook(book);
    }
    throw ApiError.notFound();
  };

  /**
   * Добавляет новую книгу
   * @param {BookModel<undefined>} book
   *
   */
  addBook = async (book: Book) => {
    if (book) {
      const createdBook = await this.bookModel.create(book);
      return this.formatedBook(createdBook);
    }

    throw ApiError.badRequest();
  };

  /**
   * Изменяет существующую книгу
   * @param {BookModel<string>['id']} bookId
   * @param {BookModel<undefined>} payload
   *
   */
  updateBook = async (bookId: string, payload: Partial<Book>) => {
    if (payload) {
      const updatedBook = await this.bookModel.findByIdAndUpdate(
        bookId,
        payload
      );

      if (updatedBook) {
        return this.formatedBook(updatedBook);
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
  deleteBook = async (bookId: string) => {
    const deletedBook = await this.bookModel.findByIdAndDelete(bookId);

    if (deletedBook) {
      return this.formatedBook(deletedBook);
    }

    throw ApiError.notFound();
  };

  formatedBook = (book: BookMongooseDoc) => {
    const { _id, ...otherFields } = book.toObject();
    return { id: _id, ...otherFields };
  };
}
