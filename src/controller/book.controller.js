import bookServices from "../service/books.services.js";

async function createBookController(req, res) {
  const newBook = req.body;
  const userId = req.userId;


  try {
    const createBook = await bookServices.createBookService(newBook, userId);
    res.status(201).send(createBook);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function findAllBookController(req, res) {
  try {
    const books = await bookServices.findAllBookService();
    return res.send(books);
  } catch (err) {
    return res.status(404).send(err.message);
  }
}

export default { createBookController, findAllBookController };
