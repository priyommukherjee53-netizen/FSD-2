// 8th experiment: Kafka producer-consumer model (backend)
// - POST /api/produce  -> producer sends a message to the Kafka topic
// - GET  /api/stream   -> consumer messages pushed to the browser (Server-Sent Events)
// - GET  /api/status   -> "kafka" (real broker) or "demo" (in-memory fallback)
// If no Kafka broker is reachable, the app falls back to demo mode so it still runs.

const path = require('path');
const EventEmitter = require('events');
const express = require('express');
const cors = require('cors');
const { Kafka, logLevel } = require('kafkajs');

const PORT = process.env.PORT || 3000;
const BROKER = process.env.KAFKA_BROKER || 'localhost:9092';
const TOPIC = process.env.KAFKA_TOPIC || 'exp8-topic';
const PARTITIONS = 3;

const bus = new EventEmitter();
bus.setMaxListeners(0);
const history = [];
let mode = 'connecting';
let producer = null;
let demoOffsets = new Array(PARTITIONS).fill(0);

function publish(evt) {
  history.push(evt);
  if (history.length > 100) history.shift();
  bus.emit('msg', evt);
}

function hash(str) {
  let h = 0;
  for (const c of str) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function connectKafka() {
  const kafka = new Kafka({
    clientId: 'exp8-app',
    brokers: [BROKER],
    logLevel: logLevel.NOTHING,
    connectionTimeout: 3000,
    retry: { retries: 1, initialRetryTime: 300 },
  });
  const admin = kafka.admin();
  const prod = kafka.producer();
  try {
    await admin.connect();
    await admin.createTopics({
      waitForLeaders: true,
      topics: [{ topic: TOPIC, numPartitions: PARTITIONS }],
    });
    await admin.disconnect();

    await prod.connect();

    const consumer = kafka.consumer({ groupId: 'exp8-group' });
    await consumer.connect();
    await consumer.subscribe({ topic: TOPIC, fromBeginning: false });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        publish({
          topic,
          partition,
          offset: message.offset,
          key: message.key ? message.key.toString() : null,
          value: message.value.toString(),
          time: new Date(Number(message.timestamp)).toISOString(),
        });
      },
    });
    producer = prod;
  } catch (err) {
    await admin.disconnect().catch(() => {});
    await prod.disconnect().catch(() => {});
    throw err;
  }
}

// In Docker, Kafka needs a few seconds to start, so we retry (KAFKA_WAIT_ATTEMPTS).
async function startKafka() {
  const attempts = Number(process.env.KAFKA_WAIT_ATTEMPTS || 1);
  for (let i = 1; i <= attempts; i++) {
    try {
      await connectKafka();
      mode = 'kafka';
      console.log(`Connected to Kafka at ${BROKER}, topic "${TOPIC}"`);
      return;
    } catch (err) {
      if (i < attempts) {
        console.log(`Waiting for Kafka at ${BROKER} (${i}/${attempts})...`);
        await sleep(3000);
      }
    }
  }
  mode = 'demo';
  console.log(`Kafka not reachable at ${BROKER}. Running in DEMO mode (in-memory).`);
}

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.get('/api/status', (req, res) => {
  res.json({ mode, broker: BROKER, topic: TOPIC });
});

app.get('/api/history', (req, res) => res.json(history));

app.post('/api/produce', async (req, res) => {
  const value = String((req.body && req.body.message) || '').trim();
  const key = req.body && req.body.key ? String(req.body.key).trim() : null;
  if (!value) return res.status(400).json({ error: 'Message is required.' });
  if (mode === 'connecting') return res.status(503).json({ error: 'Still connecting. Try again.' });

  try {
    if (mode === 'kafka') {
      const result = await producer.send({
        topic: TOPIC,
        messages: [{ key, value }],
      });
      const r = result[0];
      return res.json({ ok: true, partition: r.partition, offset: r.baseOffset });
    }
    // demo mode: behave like Kafka (key decides partition, offsets increase per partition)
    const partition = key ? hash(key) % PARTITIONS : Math.floor(Math.random() * PARTITIONS);
    const offset = demoOffsets[partition]++;
    setTimeout(() => {
      publish({
        topic: TOPIC, partition, offset: String(offset), key, value,
        time: new Date().toISOString(),
      });
    }, 150);
    res.json({ ok: true, partition, offset });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/stream', (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });
  res.flushHeaders();
  const send = (evt) => res.write(`data: ${JSON.stringify(evt)}\n\n`);
  const ping = setInterval(() => res.write(': ping\n\n'), 20000);
  bus.on('msg', send);
  req.on('close', () => {
    clearInterval(ping);
    bus.off('msg', send);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  startKafka();
});
