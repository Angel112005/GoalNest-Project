const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "01toto01",
  database: process.env.DB_NAME || "goalnest_db",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Error al conectar a MySQL:", err);
  } else {
    console.log("✅ Conectado a MySQL correctamente.");
  }
});

module.exports = db;
