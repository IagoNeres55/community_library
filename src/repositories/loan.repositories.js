import db from "../config/database.js";

db.run(`
  CREATE TABLE IF NOT EXISTS loans (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER,
  bookId INTEGER,
  duedate DATE,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (bookId) REFERENCES books(id)
  )
  `);

function createLoanRepository(userId, bookId, dueDate) {
  return new Promise((res, rej) => {
    db.run(
      `INSERT INTO loans (userId, bookId, dueDate) VALUES (?, ?, ?)`,
      [userId, bookId, dueDate],
      function (err) {
        if (err) {
          rej(err);
        } else {
          res({ id: this.lastID, userId, bookId });
        }
      }
    );
  });
}

function findAllLoanRepository() {
  return new Promise((res, rej) => {
    db.all(
      `SELECT loans.id, loans.duedate, users.email, users.username, books.title
      FROM loans 
      JOIN users ON loans.userid = users.id 
      JOIN books ON loans.bookId = books.id`,
      [],
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

function findLoanByIdRepository(loanId) {
  return new Promise((res, rej) => {
    db.get(`SELECT * FROM loans WHERE id = ?`, [loanId], (err, row) => {
      if (err) {
        rej(err);
      } else {
        res(row);
      }
    });
  });
}

//   function findAllLoanRepository() {
//     return new Promise((res, rej) => {
//       db.all(
//         `SELECT loans.id, loans.dueDate, users.email, users.username, books.title FROM loans
//         JOIN users ON loans.userId = users.id
//         JOIN books ON loans.bookId = books.id
//         `,
//         [],
//         (err, rows) => {
//           if (err) {
//             rej(err);
//           } else {
//             res(rows);
//           }
//         }
//       );
//     });
//   }
// }

function deleteLoanRepository(loanId) {
  return new Promise((res, rej) => {
    db.run(`DELETE FROM loans WHERE id = ?`, [loanId], (err) => {
      if (err) {
        rej(err);
      } else {
        res({ message: `Usuário ${loanId} deletado!` });
      }
    });
  });
}

export default {
  createLoanRepository,
  findAllLoanRepository,
  findLoanByIdRepository,
  deleteLoanRepository,
};
