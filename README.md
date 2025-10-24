# 🪶 GoalNest - Docker Compose Microservices
**Autor:** Ángel Gabriel Martínez Castillo  
**Materia:** Sistemas Operativos  
**Actividad:** C2-A5 Docker Compose

## 🧱 Arquitectura
El sistema está compuesto por tres servicios en contenedores:
1. **Frontend (React)** — Interfaz web elegante con CRUD de objetivos.
2. **Backend (Node.js + Express)** — API REST conectada a MySQL.
3. **Base de Datos (MySQL)** — Con persistencia de datos mediante volúmenes.

## ⚙️ Ejecución
```bash
docker compose up --build


🏗️ GoalNest Project

Plataforma desarrollada con arquitectura cliente-servidor basada en contenedores Docker, que integra un frontend en React, un backend en Node.js (Express) y una base de datos MySQL.
El sistema está diseñado para demostrar un entorno completo de despliegue con servicios interconectados.

⚙️ Arquitectura General
┌────────────────────────────┐
│        Frontend            │
│  React + Vite + Node 20    │
│  Puerto: 3000              │
│  http://localhost:3000     │
└─────────────┬──────────────┘
              │
              ▼
┌────────────────────────────┐
│         Backend             │
│  Node.js + Express API      │
│  Puerto: 5000               │
│  Conexión a MySQL vía ORM   │
└─────────────┬──────────────┘
              │
              ▼
┌────────────────────────────┐
│         MySQL 8.0          │
│  Base de datos persistente │
│  Usuario: root             │
│  Contraseña: 01toto01      │
│  Puerto: 3307 (externo)    │
└────────────────────────────┘

🧱 Estructura de Contenedores

| Servicio         | Imagen Base    | Puerto Externo | Descripción               |
| ---------------- | -------------- | -------------- | ------------------------- |
| `mysql-angel`    | `mysql:8.0`    | `3307 → 3306`  | Base de datos persistente |
| `backend-angel`  | `node:20`      | `5000 → 5000`  | API REST con Express      |
| `frontend-angel` | `node:20-slim` | `3000 → 3000`  | Interfaz web React        |


🧩 Características Técnicas

Frontend:
- React + Vite
- Servido con serve
- Comunicación REST con el backend

Backend:
- Node.js + Express
- Conexión MySQL mediante mysql2
- Configuración modular (db.js, routes, controllers)

Base de Datos:
- MySQL 8.0
- Volumen persistente db_data
- Healthcheck automático


