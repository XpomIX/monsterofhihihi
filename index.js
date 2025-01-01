require('dotenv').config();
const express = require('express');
const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
const port = 3000;

const cors = require('cors');

app.use(cors());

// Middleware для обработки JSON
app.use(express.json());

// Пример маршрута
app.get('/', (req, res) => {
  res.send('Hello, World!');
});


// Пример запроса к базе данных
app.get('/api/users', async (req, res) => {
  try {
    console.log(12);
    const result = await prisma.user.findMany();
    console.log(result);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка сервера');
  }
});

app.post('/api/user', async (req, res) => {
  const { id } = req.body;
  try {
    const result = await prisma.user.findUnique({
      where: {
        id
      },
      include: { Story: true }
    });
    console.log(result);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка сервера');
  }
});


// Эндпоинт который высрал
app.post('/api/registration', async (req, res) => {
  const { name, password } = req.body;
  try {
    const result = await prisma.user.create({
      data: {
        name,
        password,
      }
    });
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка сервера');
  }
});


app.post('/api/newstory', async (req, res) => {
  const { StoryId, question, userId} = req.body;
  try {
    const result = await prisma.Story.create({
      data: {
        StoryId,
        question,
        userId,
      }
    });
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка сервера');
  }
});


app.post('/api/answerstory', async (req, res) => {
  const { StoryId, answer, userId} = req.body;
  try {
    const result = await prisma.Story.create({
      data: {
        StoryId,
        answer,
        userId,
      }
    });
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка сервера');
  }
});


app.post('/api/showstory', async (req, res) => {
  const { userId, StoryId } = req.body;
  try {
    const result = await prisma.user.findUnique({
      where: {
        userId,
        StoryId,
      }
    });
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка сервера');
  }
});

app.post('/api/getlaststory', async (req, res) => {
  const {userId} = req.body;
  try {
    const lastStory = await prisma.Story.findFirst({
      where: { userId: userId },
      orderBy: { StoryId: 'desc' }, // Сортируем по убыванию StoryId
    });

    console.log(lastStory.question);
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка сервера');
  }
});


app.post('/api/login', async (req, res) => {
  const { name, password } = req.body;
  try {
    const result = await prisma.user.findUnique({
      where: {
        name,
        password,
      }
    });
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка сервера');
  }
});


// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});