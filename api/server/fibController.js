import { Pool } from 'pg';
import "dotenv/config";

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

function calculateFibonacci(n) {
  const fibSequence = [0, 1];
  for (let i = 2; i < n; i++) {
    const nextFib = fibSequence[i - 1] + fibSequence[i - 2];
    fibSequence.push(nextFib);
  }
  return fibSequence;
}

async function storeFibonacciNumbers(n) {
  const existingNumbers = await pool.query('SELECT value FROM fibonacci WHERE index <= $1', [n]);
  const existingValues = existingNumbers.rows.map((row) => row.value);
  const fibSequence = calculateFibonacci(n).filter((num) => !existingValues.includes(num));

  if (fibSequence.length > 0) {
    const values = fibSequence.map((value, index) => `($1, $${index + 2})`).join(', ');
    const query = `INSERT INTO fibonacci (index, value) VALUES ${values}`;
    await pool.query(query, [n, ...fibSequence]);
  }
}

module.exports.postFibonacci = (req, res) => {
  const n = parseInt(req.body.n);

  try {
    await storeFibonacciNumbers(n);
    res.sendStatus(200);
  } catch(error) {
    res.status(500).send(error);
  }
}

module.exports.getFibonacci = (req, res) => {
  const n = parseInt(req.params.n);

  try {
    const result = await pool.query('SELECT value FROM fibonacci WHERE index <= $1', [n]);
    const fibNumbers = result.rows.map((row) => row.value);
    res.status(200).send(fibNumbers);
  } catch(error) {
    res.status(500).send(error);
  }
}