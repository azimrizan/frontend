import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const options = [
  { value: 'alphabets', label: 'Alphabets' },
  { value: 'numbers', label: 'Numbers' },
  { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' },
];

const App = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const parsedInput = JSON.parse(input);
      const result = await axios.post('https://testbfhl-lua1.onrender.com/bfhl', parsedInput);
      setResponse(result.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions || []);
  };

  const renderResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_lowercase_alphabet } = response;
    const selectedValues = selectedOptions.map(opt => opt.value);

    return (
      <div>
        {selectedValues.includes('alphabets') && (
          <div>
            <h3>Alphabets:</h3>
            <ul>{alphabets.map((item, index) => <li key={index}>{item}</li>)}</ul>
          </div>
        )}
        {selectedValues.includes('numbers') && (
          <div>
            <h3>Numbers:</h3>
            <ul>{numbers.map((item, index) => <li key={index}>{item}</li>)}</ul>
          </div>
        )}
        {selectedValues.includes('highest_lowercase_alphabet') && (
          <div>
            <h3>Highest Lowercase Alphabet:</h3>
            <ul>{highest_lowercase_alphabet.map((item, index) => <li key={index}>{item}</li>)}</ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <h1>Frontend Application</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="5"
          cols="50"
          value={input}
          onChange={handleInputChange}
          placeholder='Enter JSON here...'
        />
        <button type="submit">Submit</button>
      </form>
      <Select
        isMulti
        options={options}
        onChange={handleSelectChange}
      />
      {renderResponse()}
    </div>
  );
};

export default App;
