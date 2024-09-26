import express from "express";
import "dotenv/config";
import "./src/service/cron.service.js"
import { routers } from "./src/routes/index.js";
const app = express();

const port = process.env.PORT || 3000;

// app.use(express.json)

// METHOD => GET, POST, PUT/PATCH, DELETE
// NAME => nomes sempre no plural
// Callback functions => Onde executamos o backend (lógica, regra de negócio)
app.use(express.json());
app.use(routers);

app.listen(port, () => {
  console.log(`server is running ${port}`);
});
