import React, { useState } from "react";
import axios from "axios";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResponse(null);

    try {
      const parsedData = JSON.parse(jsonInput);

      // Validate JSON data
      if (!parsedData || !parsedData.data || !Array.isArray(parsedData.data)) {
        throw new Error("Invalid JSON format");
      }

      // Update the API URL to use an environment variable
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';

      // Call the API
      const res = await axios.post(`${apiUrl}/bfhl`, parsedData);
      setResponse(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSelectChange = (e) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedOptions(options);
  };

  const renderResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_lowercase_alphabet } = response;

    let displayData = {};
    if (selectedOptions.includes("Numbers")) displayData.numbers = numbers;
    if (selectedOptions.includes("Alphabets")) displayData.alphabets = alphabets;
    if (selectedOptions.includes("Highest lowercase alphabet")) displayData.highest_lowercase_alphabet = highest_lowercase_alphabet;

    return (
      <pre>{JSON.stringify(displayData, null, 2)}</pre>
    );
  };

  return (
    <div className="App">
      <h1>{process.env.REACT_APP_TITLE || 'Your Application'}</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="10"
          cols="50"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Enter JSON data, e.g., {"data": ["A", "C", "z"]}'
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {response && (
        <>
          <select multiple onChange={handleSelectChange}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
          <div>
            {renderResponse()}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
