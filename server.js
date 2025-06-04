require("dotenv").config();
const express = require("express");

const pagesRouter = require("./routes/pages");

const app = express();
app.use(express.json());

// /pages rotasını tanımla
app.use("/pages", pagesRouter);

// Ek olarak /hello gibi basit rota (isteğe bağlı)
// app.get("/hello", (req, res) => res.json({ message: "Hello!" }));

module.exports = app;
