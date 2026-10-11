import type { Plugin } from 'vite';
import express from 'express';
import { apiRouter } from './api.ts';
import { initDatabase, isDbConfigured } from './db.ts';

export function yukthaApiPlugin(): Plugin {
  return {
    name: 'yuktha-api-plugin',
    configureServer(server) {
      const app = express();
      app.use(express.json());
      app.use('/api', apiRouter);

      server.middlewares.use(app);

      if (isDbConfigured()) {
        initDatabase().catch(err => {
          console.warn('[MySQL] Could not initialize tables:', err.message);
        });
      } else {
        console.log('[MySQL] DATABASE_URL not yet configured in .env. Waiting for MySQL connection string.');
      }
    }
  };
}
