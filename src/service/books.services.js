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

async function findBookByIdService(bookId) {
  const books = await bookRepository.findBookByIdRepository(bookId);
  if (!books) throw new Error("Book not exists");
  return books;
}

async function updateBookService(bookId, newBook, userId) {
  const book = await bookRepository.findBookByIdRepository(bookId);
  if (!book) throw new Error("Book not found");
  // valida se o usuário pode alterar o livro
  if (book[0].userId !== userId) throw new Error("Unaithorized");
  console.log(book[0].userId, userId);

  const res = await bookRepository.updateBookRepository(bookId, newBook);
  if (!res) throw new Error("Book not exists");
  return res;
}

async function deleteBookService(bookId) {
  const books = await bookRepository.deleteBookByIdRepository(bookId);
  if (!books) throw new Error("Book not exists");
  return books;
}

async function searchBookService(search) {
  if (!search) return bookRepository.findAllBooksRepository();
  const books = await bookRepository.searchBookRepository(search);
  return books;
}

export default {
  createBookService,
  findAllBookService,
  updateBookService,
  findBookByIdService,
  deleteBookService,
  searchBookService
};
