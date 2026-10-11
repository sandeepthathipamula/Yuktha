import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { apiRouter } from './api.ts';
import { initDatabase, isDbConfigured } from './db.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use('/api', apiRouter);

// Serve static build assets if dist exists
const distPath = path.resolve(__dirname, '../dist');
app.use(express.static(distPath));

app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Server] YUKTHA server running on http://0.0.0.0:${PORT}`);
  if (isDbConfigured()) {
    initDatabase().catch(err => {
      console.warn('[MySQL] Could not initialize tables:', err.message);
    });
  } else {
    console.log('[MySQL] DATABASE_URL not yet configured in .env. Waiting for MySQL connection string.');
  }
});
