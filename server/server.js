const path = require('path');
const express = require('express');
const fs = require('fs');
const https = require('https');

const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (req, res) => {
  res.json({ message: "Hello world!" });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
