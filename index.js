require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');


const app = express();
const port = 3000;

//11111
const cors = require('cors');
app.use(cors());
//11111

// Настройка соединения с БД
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Middleware для обработки JSON
app.use(express.json());

// Пример маршрута
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Пример запроса к базе данных
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка сервера');
  }
});
// Эндпоинт который высрал
app.post('/api/registration', async (req, res) => {
  const { id, name, password } = req.body;
  console.log(id, name, password);
  try {
    const result = await pool.query('INSERT INTO users (id, name, password) VALUES ($1, $2, $3) RETURNING *', [id, name, password]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка сервера');
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});