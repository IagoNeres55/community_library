import { el } from "date-fns/locale";
import db from "../config/database.js";

// const users = [
//   { username: 'alice', email: 'alice.smith@example.com', password: 'password123', avatar: 'alice.png', createdAt: new Date().toISOString() },
//   { username: 'bob', email: 'bob.johnson@example.com', password: 'password123', avatar: 'bob.png', createdAt: new Date().toISOString() },
//   { username: 'carol', email: 'carol.williams@example.com', password: 'password123', avatar: 'carol.png', createdAt: new Date().toISOString() },
//   { username: 'david', email: 'david.jones@example.com', password: 'password123', avatar: 'david.png', createdAt: new Date().toISOString() },
//   { username: 'emma', email: 'emma.brown@example.com', password: 'password123', avatar: 'emma.png', createdAt: new Date().toISOString() },
//   { username: 'frank', email: 'frank.davis@example.com', password: 'password123', avatar: 'frank.png', createdAt: new Date().toISOString() },
//   { username: 'grace', email: 'grace.miller@example.com', password: 'password123', avatar: 'grace.png', createdAt: new Date().toISOString() },
//   { username: 'henry', email: 'henry.wilson@example.com', password: 'password123', avatar: 'henry.png', createdAt: new Date().toISOString() },
//   { username: 'isla', email: 'isla.moore@example.com', password: 'password123', avatar: 'isla.png', createdAt: new Date().toISOString() },
//   { username: 'jack', email: 'jack.taylor@example.com', password: 'password123', avatar: 'jack.png', createdAt: new Date().toISOString() },
//   { username: 'katie', email: 'katie.anderson@example.com', password: 'password123', avatar: 'katie.png', createdAt: new Date().toISOString() },
//   { username: 'luke', email: 'luke.thomas@example.com', password: 'password123', avatar: 'luke.png', createdAt: new Date().toISOString() },
//   { username: 'molly', email: 'molly.jackson@example.com', password: 'password123', avatar: 'molly.png', createdAt: new Date().toISOString() },
//   { username: 'nathan', email: 'nathan.white@example.com', password: 'password123', avatar: 'nathan.png', createdAt: new Date().toISOString() },
//   { username: 'olivia', email: 'olivia.harris@example.com', password: 'password123', avatar: 'olivia.png', createdAt: new Date().toISOString() },
//   { username: 'paul', email: 'paul.martin@example.com', password: 'password123', avatar: 'paul.png', createdAt: new Date().toISOString() },
//   { username: 'quinn', email: 'quinn.thompson@example.com', password: 'password123', avatar: 'quinn.png', createdAt: new Date().toISOString() },
//   { username: 'rachel', email: 'rachel.garcia@example.com', password: 'password123', avatar: 'rachel.png', createdAt: new Date().toISOString() },
//   { username: 'sam', email: 'sam.martinez@example.com', password: 'password123', avatar: 'sam.png', createdAt: new Date().toISOString() },
//   { username: 'tina', email: 'tina.rodriguez@example.com', password: 'password123', avatar: 'tina.png', createdAt: new Date().toISOString() },
//   { username: 'ursula', email: 'ursula.martin@example.com', password: 'password123', avatar: 'ursula.png', createdAt: new Date().toISOString() }
// ];

// users.forEach(user => {
//   db.run(`
//     INSERT INTO users (username, email, password, avatar, createdAt)
//     VALUES (?, ?, ?, ?, ?)
//   `, [user.username, user.email, user.password, user.avatar, user.createdAt], function (err) {
//     if (err) {
//       console.error('Error inserting user:', err.message);
//     } else {
//       console.log(`User inserted with ID: ${this.lastID}`);
//     }
//   });
// });

// Fechar o banco de dados quando terminar
// db.close();

db.run(
  `CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  avatar TEXT
  
  )`
);

function createUserRepository(newUser) {
  return new Promise((res, rej) => {
    const { username, email, password, avatar, createdAt } = newUser;
    db.run(
      `
      INSERT INTO users (username, email, password, avatar, createdAt)
      VALUES(?, ?, ?, ?, ?)
      `,
      [username, email, password, avatar, createdAt],
      function (err) {
        if (err) {
          rej(err);
        } else {
          res({ id: this.lastID, ...newUser });
        }
      }
    );
  });
}

function findUserByEmailRepository(email) {
  return new Promise((res, rej) => {
    db.get(
      `
        SELECT id, username, email, avatar
        FROM users
        WHERE email = ?
      `,
      [email],
      (err, row) => {
        if (err) {
          rej(err);
        } else {
          res(row);
        }
      }
    );
  });
}

function findUserByIdRepository(id) {
  return new Promise((res, rej) => {
    db.get(
      `
        SELECT id, username, email, avatar
        FROM users
        WHERE id = ?
      `,
      [id],
      (err, row) => {
        if (err) {
          rej(err);
        } else {
          res(row);
        }
      }
    );
  });
}

function findUserByIdRepositoryPassword(id) {
  return new Promise((res, rej) => {
    db.get(
      `
        SELECT id, username, email, password, avatar
        FROM users
        WHERE id = ?
      `,
      [id],
      (err, row) => {
        if (err) {
          rej(err);
        } else {
          res(row);
        }
      }
    );
  });
}

function findAllUsersRepository() {
  return new Promise((res, rej) => {
    db.all(
      `
      SELECT id, username, email, avatar, createdAt FROM users
      `,
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

function DeleteUserRepository(id) {
  return new Promise((res, rej) => {
    db.run(
      `
        DELETE FROM users
        WHERE id = ?
      `,
      [id],
      (err) => {
        if (err) {
          rej(err);
        } else {
          if (this.changes > 0) {
            res({ message: "usuário deletado com sucesso." });
          } else {
            res({ message: "usuário não encontrado." });
          }
        }
      }
    );
  });
}

function UpdateUserRepository(id, user) {
  return new Promise((res, rej) => {
    const { username, email, password, avatar } = user;
    db.run(
      `
      UPDATE users SET
      username = ?,
      email = ?,
      password = ?,
      avatar = ?
      WHERE id = ?

    `,
      [username, email, password, avatar, id],
      (err) => {
        if (err) {
          rej(err);
        } else {
          res({ id, ...user });
        }
      }
    );
  });
}

export default {
  createUserRepository,
  findUserByEmailRepository,
  findUserByIdRepository,
  findAllUsersRepository,
  DeleteUserRepository,
  UpdateUserRepository,
  findUserByIdRepositoryPassword,
};
