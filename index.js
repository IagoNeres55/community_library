import express from "express";

import userRouters from "./src/routes/user.routes.js";
const app = express();
app.use(express.json());

// app.use(express.json)

// METHOD => GET, POST, PUT/PATCH, DELETE
// NAME => nomes sempre no plural
// Callback functions => Onde executamos o backend (lógica, regra de negócio)
app.use(userRouters);

app.listen(3000, () => {
  console.log("server is running");
});
