# Base Node.js ligera
FROM node:24-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código fuente
COPY . .

# Compilar TypeScript (si usas)
RUN npm run build

EXPOSE 3002

CMD ["sh", "-c", "npm run init-db && npm run start"]
