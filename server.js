const express = require("express");
const app = express();

app.use(express.json());

app.get("/api/hello", (req, res) => {
    return res.json({ message: "Hello from test-backend!" });
});

module.exports = app;
