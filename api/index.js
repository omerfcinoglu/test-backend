// api/index.js
const serverless = require("serverless-http");
require("dotenv").config();

const app = require("../server");

module.exports = serverless(app, {
    callbackWaitsForEmptyEventLoop: false
});
