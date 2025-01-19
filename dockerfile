# Используем официальный образ Node.js
FROM node:18

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json в контейнер
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта в контейнер
COPY . .

# Устанавливаем Prisma CLI для работы с миграциями (опционально)
RUN npx prisma generate

# Открываем порт для доступа к приложению
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "start"]
