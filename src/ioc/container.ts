import "reflect-metadata";
import { Container, ContainerModule } from "inversify";
import { BooksService } from "../services/books/index.js";
import BooksControler from "../controlers/books/index.js";

const booksContainer = new ContainerModule((bind) => {
  bind(BooksService).toSelf().inSingletonScope();
  bind(BooksControler).toSelf();
});

const container = new Container();

container.load(booksContainer);

export { container };
