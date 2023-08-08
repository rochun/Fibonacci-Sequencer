const express = require('express');
const path = require('path');
const cors = require('cors');
require("dotenv/config");
const { fileURLToPath } = require('url');
const { dirname } = require('path');
const { postFibonacci, getFibonacci } = require('./fibController.js');

const app = express();
const PORT = 3030;
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(cors());

app.post('/fibonacci', postFibonacci);
app.get('/fibonacci/:n', getFibonacci);

app.listen(PORT, () => {
  console.log(`\nListening on port ${PORT}\n`);
});
