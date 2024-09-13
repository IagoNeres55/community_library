import express from "express";
import "dotenv/config"
import userRouters from "./src/routes/user.routes.js";
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000

// app.use(express.json)

// METHOD => GET, POST, PUT/PATCH, DELETE
// NAME => nomes sempre no plural
// Callback functions => Onde executamos o backend (lógica, regra de negócio)
app.use(userRouters);

app.listen(port, () => {
  console.log(`server is running ${port}`);
});
