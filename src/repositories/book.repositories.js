import db from "../config/database.js";

db.run(`
    CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    userId INTEGER,
    FOREIGN KEY (userId) REFERENCES users(id)
    )
    `);

function createBookRepository(newBook, userId) {
  return new Promise((res, rej) => {
    const { title, author } = newBook;
    console.log(title);
    db.run(
      `INSERT INTO books (title, author, userId)
      VALUES(?, ?, ?)`,
      [title, author, userId],
      function (err) {
        if (err) {
          rej(err);
        } else {
          res({ id: this.lastID, ...newBook });
        }
      }
    );
  });
}

function findAllBooksRepository() {
  return new Promise((res, rej) => {
    db.all(`SELECT * FROM books`, {}, (err, rows) => {
      if (err) {
        rej(err);
      } else {
        res(rows);
      }
    });
  });
}

function findBookByIdRepository(bookId) {
  return new Promise((res, rej) => {
    db.all(`SELECT * FROM books WHERE id = ?`, [bookId], (err, row) => {
      if (err) {
        rej(err);
      } else {
        res(row);
      }
    });
  });
}

async function updateBookRepository(bookId, newBook) {
  const { setClause, values } = Object.entries({
    title: newBook.title,
    author: newBook.author,
  }).reduce(
    (acc, [key, value]) => {
      if (value !== undefined) {
        acc.setClause.push(`${key} = ?`);
        acc.values.push(value);
      }
      return acc;
    },
    { setClause: [], values: [] }
  );

  if (setClause.length === 0) {
    throw new Error("Nenhuma modificação enviada!");
  }

  const query = `UPDATE books SET ${setClause.join(", ")} WHERE id = ?`;
  values.push(bookId);

  console.log(query, values);

  return new Promise((res, rej) => {
    db.run(query, values, function (err) {
      if (err) return rej(err);
      res({ message: "Sucess" });
    });
  });
}

function deleteBookByIdRepository(bookId) {
  return new Promise((res, rej) => {
    db.run(`DELETE FROM books WHERE id = ?`, [bookId], (err) => {
      if (err) {
        rej(err);
      } else {
        res({ message: "Livro deletado com sucesso" });
      }
    });
  });
}

function searchBookRepository(search) {
  return new Promise((res, rej) => {
    db.all(
      `SELECT * FROM books WHERE title LIKE ? OR author LIKE ?`,
      [`%${search}%`, `%${search}%`],
      (err, rows) => {
        if (err) {
          rej(err);
        } else {
          res(rows);
        }
      }
    );
  });
}

export default {
  createBookRepository,
  findAllBooksRepository,
  updateBookRepository,
  findBookByIdRepository,
  deleteBookByIdRepository,
  searchBookRepository
};
