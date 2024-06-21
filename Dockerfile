# Usa una imagen base oficial de Node.js
FROM node:20-alpine

# Crea y establece el directorio de trabajo
WORKDIR /app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos de la aplicación al directorio de trabajo
COPY . .

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 5000

# Define el comando para iniciar la aplicación
CMD ["node", "index.js"]
