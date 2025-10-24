# Imagen base completa de Node
FROM node:20

# Directorio de trabajo
WORKDIR /app

# Copiar archivos
COPY package*.json ./
RUN npm install

# Copiar código fuente
COPY . .

# Exponer el puerto 5000
EXPOSE 5000

# Comando de inicio
CMD ["node", "server.js"]
