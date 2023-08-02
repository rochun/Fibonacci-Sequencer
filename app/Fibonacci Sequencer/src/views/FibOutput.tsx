import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const FibOutput = () => {
  const { n } = useParams();

  const [fibNumbers, setFibNumbers] = useState([]);


  useEffect(() => {
    const getFibNumbers = async () => {
      try {
        const response = await axios.get(`/fibonacci/${n}`);

        setFibNumbers(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getFibNumbers();
  }, [n])
  return (
    <>
      <h1>First {n} Fibonacci Numbers:</h1>
      <p>{fibNumbers.join(', ')}</p>
    </>
  );
};