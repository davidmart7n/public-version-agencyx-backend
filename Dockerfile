# Usa una imagen base de Node.js
FROM node:18-slim

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Expone el puerto en el que la aplicación escucha
EXPOSE 5000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
