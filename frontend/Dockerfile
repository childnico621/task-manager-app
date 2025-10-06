FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Exponer el puerto interno que usa Vite
EXPOSE 5173

# Levantar Vite en desarrollo
CMD ["npm", "run", "dev"]
