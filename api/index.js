const serverless = require("serverless-http");
require("dotenv").config();

const express = require("express");
const app = express();

// /api altına yönlendiriyoruz:
const realApp = require("../server");
app.use(realApp);

module.exports = serverless(app, {
    callbackWaitsForEmptyEventLoop: false
});
