const pg = require('pg');
const format =  require("pg-format");
require("dotenv/config");

const pool = new pg.Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

const fibCache = new Map();

function calculateFibonacci(n) {

  const fibSequence = [0, 1];
  for (let i = 2; i < n; i++) {
    const nextFib = fibSequence[i - 1] + fibSequence[i - 2];
    fibSequence.push(nextFib);
  }

  fibCache.set(n, fibSequence);

  return fibSequence;
}

async function storeFibonacciNumbers(n) {
  try {
    if (fibCache.has(n)) {
      return fibCache.get(n);
    }

    const existingNumbers = await pool.query(
      'SELECT index FROM fibonacci WHERE index <= $1',
      [n]
    );
    const existingValues = new Set(existingNumbers.rows.map((row) => row.index));
    const fibSequence = [[1, 0], [2, 1]];
    console.log(existingValues)
    for (let i = 2; i < n; i++) {
      const nextFib = fibSequence[i - 1][1] + fibSequence[i - 2][1];
      fibSequence.push([i + 1, nextFib]);
    }

    const newNumbers = fibSequence.filter((num) => !existingValues.has(num[0]));
    console.log(newNumbers);
    if (newNumbers.length > 0) {
      const values = newNumbers
        .map((value) => `(${value[0]}, ${value[1]})`)
        .join(', ');

      console.log(values);
      const query =
        `INSERT INTO fibonacci (index, value) VALUES %L`;
      await pool.query(format(query, newNumbers));
    }

    // Store the whole Fibonacci sequence in the cache
    fibCache.set(n, fibSequence);
  } catch (error) {
    console.error('Error storing Fibonacci numbers:', error);
  }
}

module.exports.postFibonacci = async (req, res) => {
  const n = parseInt(req.body.n);
  console.log(req.body);
  console.log(n);
  try {
    await storeFibonacciNumbers(n);

    res.sendStatus(200);
  } catch(error) {
    console.log(error);
    res.status(500).send(error);
  }
}

module.exports.getFibonacci = async (req, res) => {
  const n = parseInt(req.params.n);
  console.log(n)
  try {
    const result = await pool.query('SELECT * FROM fibonacci WHERE index <= $1', [n]);
    console.log(result.rows);
    const fibNumbers = result.rows.map((row) => row.value);

    res.status(200).send(fibNumbers);
  } catch(error) {
    console.log(error);
    res.status(500).send(error);
  }
}