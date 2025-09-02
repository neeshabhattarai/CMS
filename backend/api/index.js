// backend/api/index.js
const serverless = require("serverless-http");
const app = require("../app"); // your Express app

module.exports = (req, res) => {
  const handler = serverless(app);
  return handler(req, res);
};

