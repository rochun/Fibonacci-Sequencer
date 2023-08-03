import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const FibOutput = () => {
  const { n } = useParams();
  const navigate = useNavigate();
  const [fibNumbers, setFibNumbers] = useState([]);


  useEffect(() => {
    const getFibNumbers = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/fibonacci/${n}`);

        setFibNumbers(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getFibNumbers();
  }, [n])

  const handleBack = () => {
    navigate('/');
  }
  return (
    <>
      <h1>First {n} Fibonacci Numbers:</h1>
      <p>{fibNumbers.join(', ')}</p>
      <button onClick={handleBack} style={{backgroundColor: 'grey'}}>Back</button>
    </>
  );
};