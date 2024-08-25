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

      // Call the API
      const apiUrl = process.env.REACT_APP_API_URL;
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
      <pre style={styles.pre}>{JSON.stringify(displayData, null, 2)}</pre>
    );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>{process.env.REACT_APP_TITLE}</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <textarea
          rows="10"
          cols="50"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Enter JSON data, e.g., {"data": ["A", "C", "z"]}'
          style={styles.textarea}
        />
        <br />
        <button type="submit" style={styles.button}>Submit</button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
      {response && (
        <>
          <select multiple onChange={handleSelectChange} style={styles.select}>
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

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f4f4f9',
    minHeight: '100vh',
  },
  header: {
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  textarea: {
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '10px',
    width: '100%',
    maxWidth: '600px',
    marginBottom: '10px',
    resize: 'vertical',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  select: {
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '5px',
    marginBottom: '10px',
    maxWidth: '600px',
    width: '100%',
  },
  pre: {
    backgroundColor: '#eee',
    borderRadius: '4px',
    padding: '10px',
    maxWidth: '600px',
    whiteSpace: 'pre-wrap',
  },
};

export default App;

