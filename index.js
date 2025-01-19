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
    const result = await prisma.user.findMany();
    console.log(result);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка сервера');
  }
});


app.get('/api/user', async (req, res) => {
  const { id } = req.query;
  try {
    const result = await prisma.user.findUnique({
      where: {
        id: parseInt(id)
      },
      include: { stories: { select: { id: true } } },
    });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка сервера');
  }
});


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


app.post('/api/updatestory', async (req, res) => {
  const { userId, question } = req.body;

  try {
    const lastStory = await prisma.Story.findFirst({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' },
    });

    if (!lastStory) {
      return res.status(404).send('Запись не найдена');
    }

    const result = await prisma.Story.update({
      where: { id: lastStory.id },
      data: { question: question },
    });

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка сервера');
  }
});


app.post('/api/newstory', async (req, res) => {
  const { question, userId} = req.body;
  try {
    const result = await prisma.Story.create({
      data: {
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
  const { userId, answer } = req.body;

  try {
    const lastStory = await prisma.Story.findFirst({
      where: { userId: userId },
      orderBy: { createdAt: 'desc' },
    });

    if (!lastStory) {
      return res.status(404).send('Запись не найдена');
    }

    const result = await prisma.Story.update({
      where: { id: lastStory.id },
      data: { answer: answer },
    });

    res.status(200).json(result);
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
      orderBy: { createdAt: 'desc' }, 
    });
    res.status(200).json(lastStory);
    console.log(lastStory.question);
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка сервера');
  }
});


app.post('/api/login', async (req, res) => {
  const { name, password } = req.body;
  try {
    const { id } = await prisma.user.findUniqueOrThrow({
      where: {
        name,
        password,
      }
    });
    res.status(200).json(id);
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка сервера');
  }
});


// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});