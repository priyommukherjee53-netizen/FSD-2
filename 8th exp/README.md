# 8th Experiment: Kafka Producer-Consumer Model

Backend: Node.js + Express + KafkaJS. Frontend: plain HTML/JS (served by the backend).

## Option A: Run everything with Docker (recommended)
1. Install and start **Docker Desktop** (wait until it says Docker is running).
2. Open this "8th exp" folder in VS Code, open the terminal (Ctrl + `) and run:
   ```
   docker compose up --build
   ```
   The first run downloads images and may take a few minutes.
3. Open http://localhost:3000. The badge should say "Connected to Kafka".
4. Stop with Ctrl+C, then `docker compose down`.

Useful commands:
```
docker compose up --build -d     # run in background
docker compose logs -f app       # see backend logs
docker compose down              # stop and remove containers
```

## Option B: Run without Docker (demo mode)
```
cd backend
npm install
npm start
```
Open http://localhost:3000. With no Kafka running, the app uses an in-memory topic.

## Option C: Backend on your PC + Kafka in Docker
```
docker compose up -d kafka
cd backend
npm install
npm start
```

## How it works
- Producer: the form sends POST /api/produce, and the backend publishes to topic `exp8-topic` (3 partitions).
- Consumer: the backend consumes the topic (group `exp8-group`) and pushes each message to the browser over Server-Sent Events (GET /api/stream).
- Same key = same partition. No key = spread across partitions.

## Test with Thunder Client
1. Install the **Thunder Client** extension in VS Code and start the backend.
2. Thunder Client > Collections > menu (...) > Import > choose `thunder-client/exp8-collection.json`.
3. Run the requests in order:
   - GET  http://localhost:3000/api/status
   - POST http://localhost:3000/api/produce  (JSON body: {"key": "user-42", "message": "Hello"})
   - GET  http://localhost:3000/api/history  (shows what the consumer received)

## Folder structure
```
8th exp/
  backend/   server.js, package.json
  frontend/  index.html
  thunder-client/  exp8-collection.json
  Dockerfile, .dockerignore, docker-compose.yml
  .vscode/   tasks.json, launch.json
```
Optional settings: KAFKA_BROKER (default localhost:9092), KAFKA_TOPIC, PORT.
