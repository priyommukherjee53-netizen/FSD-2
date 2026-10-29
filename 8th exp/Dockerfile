FROM node:20-alpine
WORKDIR /app

# install backend dependencies first (better layer caching)
COPY backend/package.json ./backend/
RUN cd backend && npm install --omit=dev

# app code (backend serves the frontend folder)
COPY backend ./backend
COPY frontend ./frontend

WORKDIR /app/backend
ENV PORT=3000
EXPOSE 3000
CMD ["node", "server.js"]
