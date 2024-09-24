import bookServices from "../service/books.services.js";

async function createBookController(req, res) {
  const newBook = req.body;
  const userId = req.userId;

  try {
    const createBook = await bookServices.createBookService(newBook, userId);
    return res.status(201).send(createBook);
  } catch (err) {
    return res.status(400).send(err.message);
  }
}

async function findAllBookController(req, res) {
  const { bookId } = req.query;
  try {
    if (!bookId) {
      const books = await bookServices.findAllBookService();
      return res.send(books);
    } else {
      const books = await bookServices.findBookByIdService(bookId);
      return res.send(books);
    }
  } catch (err) {
    return res.status(404).send(err.message);
  }
}

async function updateBookController(req, res) {
  const { bookId } = req.params;
  const newBook = req.body;

  // pega o id do usuário do token
  const userId = req.userId;

  try {
    const books = await bookServices.updateBookService(bookId, newBook, userId);
    return res.send(books);
  } catch (err) {
    return res.status(404).send(err.message);
  }
}

async function deleteBookById(req, res) {
  const { bookId } = req.params;
  if (!bookId) {
    throw new Error("Id is required");
  }
  try {
    const books = await bookServices.deleteBookService(bookId);
    return res.send(books);
  } catch (err) {
    return res.status(404).send(err.message);
  }
}

async function searchBookController(req, res) {
  const query = req.query;
  try {
    const books = await bookServices.searchBookService(query);
    return res.send(books);
  } catch (err) {
    return res.status(404).send(err.message);
  }
}

export default {
  createBookController,
  findAllBookController,
  updateBookController,
  deleteBookById,
  searchBookController
};
