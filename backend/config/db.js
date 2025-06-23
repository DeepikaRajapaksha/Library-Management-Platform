const knex = require('knex');
require('dotenv').config();

const db = knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});

db.raw('SELECT 1')
  .then(() => console.log("✅ DB Connected"))
  .catch(err => console.error("❌ DB Connection Failed:", err));
