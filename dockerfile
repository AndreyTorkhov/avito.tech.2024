# Используем базовый образ Node.js
FROM node:20

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --legacy-peer-deps

# Копируем все файлы проекта в контейнер
COPY . .

# Открываем порт 5173, который будет использовать Vite
EXPOSE 5173

# Запускаем приложение в режиме разработки
CMD ["npm", "run", "dev"]
