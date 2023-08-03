import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const FibInput = () => {
  const [nthInput, setNthInput] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response  = await axios.post('http://localhost:3030/fibonacci', {
        n: nthInput
      })

      console.log(response);
      navigate(`/result/${nthInput}`);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Fibonacci Sequencer</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter a number (n) to generate the first n-th Fibonacci Numbers:
          <input type="number" value={nthInput} min="1" onChange={(e) => setNthInput(e.target.value)} required />
        </label>
        <button type='submit' style={{backgroundColor: 'grey'}}>Generate</button>
      </form>
    </>
  );
}