import React, { useState } from 'react';
import './App.css';

/*
 
Перевод
Create an app that calculates body mass index with JavaScript or React.js. The app should include:
Name Two fields where you can enter your height and weight "Calculate" button An answer field where you can find 
your body index Reset button that clears the fields
Main criteria:
The answer box and the reset button must not be visible until the calculate button is pressed. Reflect body index 
answers in different colors. That is, if the weight is too low, it should have a yellow color, if normal, green, 
if overweight, orange, and if obesity, it should have a red color. The answer should look like this: "You weigh.... 
here you can choose whether the weight is too low or normal, etc." Your body mass index is..... here you enter the 
calculated body mass index. After pressing the reset button, the input fields must be cleared and both the answer 
and the reset button must be hidden.

*/

const App = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState(null);

  const handleHeightChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Allow only numeric input
    setHeight(value);
  };

  const handleWeightChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Allow only numeric input
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
