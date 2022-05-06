const path = require('path');
const express = require('express');
const fs = require('fs');
const https = require('https');
const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

const app = express();
const prisma = new PrismaClient();

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(bodyParser.json());
app.use(express.json());
BigInt.prototype.toJSON = function() { return this.toString() };

app.get("/api", (req, res) => {
  res.json({ message: "Hello world!" });
});

require('./api/v1/controllers/users')(app, prisma);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
