DROP DATABASE IF EXISTS FibonacciNumbers;
CREATE DATABASE FibonacciNumbers;

\c fibonaccinumbers;

DROP TABLE IF EXISTS Fibonacci;

CREATE TABLE fibonacci (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  index INT NOT NULL,
  value TEXT NOT NULL,
  CONSTRAINT unique_value UNIQUE (index)
);

CREATE INDEX fib_id_index on fibonacci using HASH (index);