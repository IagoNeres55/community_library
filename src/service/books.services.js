import bookRepository from "../repositories/book.repositories.js";

async function createBookService(newBook, userId) {
  const createBook = await bookRepository.createBookRepository(newBook, userId);
  if (!createBook) throw new Error("Error Creating book");

  return createBook;
}

async function findAllBookService() {
  const books = await bookRepository.findAllBooksRepository();
  if (!books) throw new Error("Book not exists");
  return books;
}

export default {
  createBookService,
  findAllBookService,
};
