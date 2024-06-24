import { Router } from "express";
import { requestClient } from "../../utils/requestClient.js";

export const booksRouter = Router();

/** Получение страницы со списком всех книг */
booksRouter.get("/books", async (req, res) => {
  const books = await requestClient.get(req.url);
  return res.render("pages/books/list", { books: books.data });
});

/** Получение страницы для создания новой книги*/
booksRouter.get("/books/create", (_req, res) => {
  try {
    return res.render("pages/books/create", { book: {} });
  } catch (error) {
    console.log(error);
  }
});
/** Обработка формы создания книги */
booksRouter.post("/books/create", async (req, res) => {
  try {
    const payload = req.body;
    await requestClient.post("/books", payload);
    return res.redirect("/books");
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error?.message || "Некая ошибка" });
  }
});

/** Получение страницы для изменения книги*/
booksRouter.get("/books/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await requestClient.get(`/books/${id}`);
    return res.render("pages/books/update", { book: response.data });
  } catch (error) {
    console.log(error);
    if (error?.response?.data?.status === 404) {
      return res.redirect("/404");
    }
    return res.redirect("/");
  }
});
/** Обработка формы изменения книги */
booksRouter.post("/books/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    await requestClient.patch(`/books/${id}`, payload);
    return res.redirect("/books");
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error?.message || "Некая ошибка" });
  }
});

/** Получение страницы детального просмотра книги*/
booksRouter.get("/books/:id", async (req, res) => {
  try {
    const book = await requestClient.get(req.url);
    return res.render("pages/books/detail", { book: book.data });
  } catch (error) {
    if (error?.response?.data?.status === 404) {
      return res.redirect("/404");
    }
    return res.redirect("/");
  }
});

/** Обработка формы удаления книги */
booksRouter.post("/books/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await requestClient.delete(`/books/${id}`);
    return res.redirect("/books");
  } catch (error) {
    if (error?.response?.data?.status === 404) {
      return res.redirect("/404");
    }
    return res.redirect("/");
  }
});

// booksRouter.get("/books", (_req, res) => {
//   return res.render("pages/books", {
//     title: "Книжки для малышки",
//   });
// });
