import express from "express";

const app = express();

app.use(express.json());

// app.use(express.json)

// METHOD => GET, POST, PUT/PATCH, DELETE
// NAME => nomes sempre no plural
// Callback functions => Onde executamos o backend (lógica, regra de negócio)

const users = [];

app.post("/users", (req, res) => {
  const body = req.body;
  users.push(body);
  res.status(201).json(users);
});

app.get("/users", (req, res) => {
  res.send({ message: "esse são os usersss", users });
});

app.listen(3000, () => {
  console.log("server is running");
});
