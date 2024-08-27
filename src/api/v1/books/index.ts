import { Router } from "express";
import fileUpload from "express-fileupload";
import BooksControler from "../../../controlers/books/index.js";
import { container } from "../../../ioc/container.js";

export const booksRouter = Router();

booksRouter.use(
  fileUpload({
    uriDecodeFileNames: true,
  })
);

booksRouter.get("/books", container.get(BooksControler).getAll);

booksRouter.get("/books/:id", container.get(BooksControler).getOne);

booksRouter.post("/books", container.get(BooksControler).createOne);

booksRouter.patch("/books/:id", container.get(BooksControler).updateOne);

booksRouter.delete("/books/:id", container.get(BooksControler).deleteOne);
