const serverless = require('serverless-http');
const app = require('../app'); // your express app

module.exports.handler = serverless(app);
