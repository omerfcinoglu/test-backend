// backend/api/index.js
const serverless = require("serverless-http");
require("dotenv").config();

const express = require("express");
const app = express();

// Burada "/api" altındaki her isteği Express app'inize aktarıyoruz:
const realApp = require("../server");
app.use("/api", realApp);

module.exports = serverless(app, {
    callbackWaitsForEmptyEventLoop: false
});
