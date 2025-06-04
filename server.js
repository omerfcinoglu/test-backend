// backend/server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const pageRoutes = require("./routes/pageRoutes");
const postRoutes = require("./routes/postRoutes");
const membersRoutes = require("./routes/membersRoutes");

const app = express();
app.use(cors(), express.json(), morgan("dev"));

app.use("/auth", authRoutes);
app.use("/pages", pageRoutes);
app.use("/posts", postRoutes);
app.use("/members", membersRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB'ye başarıyla bağlandı"))
  .catch((err) => console.log("❌ MongoDB Bağlantı Hatası:", err));

// ***Mutlaka bu satır çalışmalı, koşulsuz olarak:***
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server ${PORT} portunda çalışıyor`));

module.exports = app;
