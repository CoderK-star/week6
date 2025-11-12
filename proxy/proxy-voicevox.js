// Simple VOICEVOX proxy with CORS and static hosting
// Usage:
//   1) Install deps: npm install
//   2) Set VOICEVOX_URL if not localhost:50021
//   3) Place your static site files one level up (../). This server will serve them.
//   4) Start: npm start
//   5) Open: http://localhost:5173/interactive_map.html
//   6) The chatbot iframe can use vv_url=/voicevox (e.g., chatbot.html?minimal=1&vv=1&vv_url=/voicevox)

const path = require('path');
const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const TARGET = process.env.VOICEVOX_URL || 'http://localhost:50021';
const PORT = process.env.PORT || 5173;

// CORS for all routes (loose; adjust origin as needed)
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

// Preflight (OPTIONS)
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.sendStatus(200);
});

// Proxy /voicevox/* -> VOICEVOX engine
app.use('/voicevox', createProxyMiddleware({
  target: TARGET,
  changeOrigin: true,
  pathRewrite: { '^/voicevox': '' },
  onProxyRes(proxyRes) {
    // Ensure CORS headers present on responses
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Methods'] = 'GET,POST,OPTIONS';
    proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type';
  }
}));

// Serve static files from project root (../)
const rootDir = path.resolve(__dirname, '..');
app.use(express.static(rootDir));

app.listen(PORT, () => {
  console.log(`VOICEVOX proxy running on http://localhost:${PORT}`);
  console.log(`Forwarding /voicevox -> ${TARGET}`);
  console.log(`Serving static from: ${rootDir}`);
});
