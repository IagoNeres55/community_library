import bookController from "../controller/book.controller.js";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middlewares.js";
import { bookSchema } from "../schema/book.schema.js";

const router = Router();

// se passar o query parametro userId ele filtra
router.get("/books", bookController.findAllBookController);
router.use(authMiddleware);

router.post(
  "/books",
  validate(bookSchema),
  bookController.createBookController
);

router.put(
  "/books/:bookId",
  validate(bookSchema),
  bookController.updateBookController
);

router.get("/books", bookController.searchBookController);

router.delete("/books/:bookId", bookController.deleteBookById);
export default router;
