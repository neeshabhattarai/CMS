
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "switchyard.proxy.rlwy.net",
  port: 49160,
  user: "root",
  password: "JUygJCnYYOcXpupjePnyuhieDMThTWFJ",
  database: "railway",
  ssl: { rejectUnauthorized: false } // try removing this if it fails
});

connection.connect(err => {
  if (err) {
    console.error("❌ Connection failed:", err.message);
  } else {
    console.log("✅ Connected to Railway MySQL!");
    connection.end();
  }
});

