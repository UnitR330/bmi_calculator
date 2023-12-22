import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState(null);

  const handleHeightChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '');  
    value = value > 251 ? '251' : value;  

    if (value >= 251) {
      alert('Maximum registered human height is 251 cm. Input your real height.');
    }

    setHeight(value);
  };

  const handleWeightChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '');  
    value = value > 635 ? '635' : value;  
    if (value >= 635) {
        alert('Maximum registered human weight is 635 kg. That person dead 1983 year. Input your real weight.');
      }

    setWeight(value);
  };

  const calculateBMI = () => {
    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);

    if (isNaN(heightInMeters) || isNaN(weightInKg)) {
      setResult(null);
      return;
    }

    const bmi = weightInKg / (heightInMeters * heightInMeters);

    let message, color;
    if (bmi < 18.5) {
      message = 'Your weight is too low.';
      color = 'yellow';
    } else if (bmi >= 18.5 && bmi < 25) {
      message = 'Your weight is normal.';
      color = 'green';
    } else if (bmi >= 25 && bmi < 30) {
      message = 'You are overweight.';
      color = 'orange';
    } else {
      message = 'You have obesity.';
      color = 'red';
    }

    setResult({
      message,
      bmi,
      color,
    });
  };

  const resetFields = () => {
    setHeight('');
    setWeight('');
    setResult(null);
  };

  return (
    <div className="App">
      <div>
        <label>
          Height (cm):
          <input type="text" value={height} onChange={handleHeightChange} />
        </label>
      </div>
      <div>
        <label>
          Weight (kg):
          <input type="text" value={weight} onChange={handleWeightChange} />
        </label>
      </div>
      <div>
        <button onClick={calculateBMI}>Calculate</button>
      </div>
      {result && (
        <div style={{ color: result.color }}>
          <p>{result.message}</p>
          <p>Your body mass index is: {result.bmi.toFixed(2)}</p>
        </div>
      )}
      {result && (
        <div>
          <button onClick={resetFields}>Reset</button>
        </div>
      )}
    </div>
  );
};

export default App;
