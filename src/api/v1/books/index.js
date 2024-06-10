import { Router } from "express";
import fileUpload from "express-fileupload";
import BooksControler from "../../../controlers/books/index.js";

export const booksRouter = Router();

booksRouter.use(
  fileUpload({
    uriDecodeFileNames: true,
  })
);

booksRouter.get("/books", BooksControler.getAll);

booksRouter.get("/books/:id", BooksControler.getOne);

booksRouter.post("/books", BooksControler.createOne);

booksRouter.patch("/books/:id", BooksControler.updateOne);

booksRouter.delete("/books/:id", BooksControler.deleteOne);

booksRouter.post("/books/:id", BooksControler.uploadFile);

booksRouter.get("/books/:id/download", BooksControler.downloadFile);
