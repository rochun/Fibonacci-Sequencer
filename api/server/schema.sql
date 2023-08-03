DROP DATABASE IF EXISTS FibonacciNumbers;
CREATE DATABASE FibonacciNumbers;

\c fibonaccinumbers;

DROP TABLE IF EXISTS Fibonacci;

CREATE TABLE fibonacci (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  fibIndex INT NOT NULL,
  fib_num TEXT NOT NULL
);

CREATE INDEX fib_id_index on fibonacci using HASH (fibIndex);