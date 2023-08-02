import express from 'express';
import path from 'path';
import "dotenv/config";
import { postFibonacci, getFibonacci } from './fibController';

const app = express();
const PORT = 3030;

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());

app.post('/fibonacci', postFibonacci);
app.get('/fibonacci/:n', getFibonacci);

app.listen(PORT, () => {
  console.log(`\nListening on port ${PORT}\n`);
});
