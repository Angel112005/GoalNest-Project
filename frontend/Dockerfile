# Etapa 1: construir la app
FROM node:20 AS builder
WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Instalar el binario de rollup para Linux (solución al bug)
RUN npm install @rollup/rollup-linux-x64-gnu --save-dev

# Copiar el resto del proyecto
COPY . .

# Ejecutar build
RUN npm run build

# Etapa 2: servidor estático
FROM node:20-slim
WORKDIR /app

RUN npm install -g serve

# Copiar los archivos generados
COPY --from=builder /app/dist ./dist

EXPOSE 3000

# Servir la app
CMD ["serve", "-s", "dist", "-l", "3000"]
