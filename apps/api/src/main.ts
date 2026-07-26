/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import type { Chat } from '@hashbrownai/core';
import { HashbrownGoogle } from '@hashbrownai/google';
import { HashbrownOpenAI } from '@hashbrownai/openai';
import express from 'express';
import * as path from 'path';

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  );
  const acrh = req.headers['access-control-request-headers'];
  const allowHeaders = Array.isArray(acrh)
    ? acrh.join(', ')
    : typeof acrh === 'string'
      ? acrh
      : 'Content-Type, Authorization';
  res.setHeader('Access-Control-Allow-Headers', allowHeaders);
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }
  next();
});

app.use(express.json({ limit: '1mb' }));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

app.post('/api/chat/google', async (req, res) => {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'Missing GOOGLE_API_KEY' });
    return;
  }

  try {
    const stream = HashbrownGoogle.stream.text({
      apiKey,
      request: req.body as Chat.Api.CompletionCreateParams,
    });

    res.setHeader('Content-Type', 'application/octet-stream');

    for await (const chunk of stream) {
      res.write(chunk);
    }
    res.end();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (!res.headersSent) {
      res.status(500).json({ error: message });
      return;
    }
    res.end();
  }
});

app.post('/api/chat/openai', async (req, res) => {
  const stream = HashbrownOpenAI.stream.text({
    apiKey: process.env.OPENAI_API_KEY!,
    request: req.body, // must be Chat.Api.CompletionCreateParams
  });

  res.header('Content-Type', 'application/octet-stream');

  for await (const chunk of stream) {
    res.write(chunk); // Pipe each encoded frame as it arrives
  }

  res.end();
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(
    `Listening at http://localhost:${port}/api (POST /chat for Hashbrown stream)`,
  );
});
server.on('error', console.error);
