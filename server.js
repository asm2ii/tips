const express = require('express');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const pagesRouter = require('./routes/pages');
app.use('/', pagesRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).send('Halaman tidak ditemukan');
});

// Export untuk Vercel (jangan pakai app.listen)
module.exports = app;