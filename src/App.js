import React, { useState } from 'react';
import './App.css';

function App() {
  const [bmi, setBmi] = useState(null);
  const [verdict, setVerdict] = useState([0, 0]);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [visible, setVisible] = useState('none');

  function reset() {
    setVisible('none');
    setWeight('');
    setHeight('');
  }

  function calculate(event) {
    event.preventDefault();
    const enteredWeight = parseFloat(event.target[1].value);
    const enteredHeight = parseFloat(event.target[0].value);
 
    setWeight(enteredWeight);
    let localBmi = ((enteredWeight / enteredHeight ** 2) * 10000).toFixed(1);

    if (localBmi === 'Infinity' || isNaN(localBmi)) {
      localBmi = `¯\\_(ツ)_/¯`;
      setBmi(localBmi);
      setVerdict(['', 'lightcoral']);
    } else {
      setBmi(localBmi);
      // eslint-disable-next-line default-case
      switch (true) {
        case localBmi < 18.5:
          setVerdict(['Per mažas svoris', 'rgb(174, 217, 210)']);
          break;
        case localBmi >= 18.5 && localBmi <= 24.9:
          setVerdict(['Normalus svoris', 'rgb(155, 231, 86)']);
          break;
        case localBmi >= 25.0 && localBmi <= 29.9:
          setVerdict(['Viršsvoris', 'rgb(254, 252, 165)']);
          break;
        case localBmi >= 30.0 && localBmi <= 34.9:
          setVerdict(['I Laipsnio nutukimas', 'rgb(253, 216, 5)']);
          break;
        case localBmi >= 35.0 && localBmi <= 39.9:
          setVerdict(['II Laipsnio nutukimas', 'rgb(246, 140, 49)']);
          break;
        case localBmi >= 40.0:
          setVerdict(['III Laipsnio nutukimas', 'rgb(246, 140, 49)']);
          break;
      }
    }
    setVisible('block');
  }

  function handleHeightChange(e) {
    let value = e.target.value.replace(/[^0-9]/g, ''); 
    value = value > 251 ? '251' : value;  

    if (value >= 251) {
      alert('Maximum height of human living at present time is 251 cm. His name Sultan Kösen. Is it you?');
    }
    
    setHeight(value);
  }
  
  function handleWeightChange(e) {
    let value = e.target.value.replace(/[^0-9]/g, '');  
    value = value > 635 ? '635' : value;  
    if (value >= 635) {
      alert('Maximum registered human weight is 635 kg. That person dead 1983 year. Input your real weight.');
    }
    setWeight(value);
  }

  return (
    <div className="App">
      <h1>KMI Skaičiuoklė</h1>
      <div id="input">
        <form onSubmit={(event) => calculate(event)}>
          <label htmlFor="heigth">Ūgis(cm)</label>
          <input type="number" id="height" value={height} onChange={(e) => handleHeightChange(e)} />
          <label htmlFor="weight">Svoris(kg)</label>
          <input type="number" id="weight" value={weight} onChange={(e) => handleWeightChange(e)} />
          <button type="submit">Skaičiuoti</button>
        </form>
      </div>
      <div id="output" style={{ display: `${visible}` }}>
        <h2>
          <span id="verdict">{verdict[0]}</span>
          <br></br>
          <br></br> Jūsų kūno masės indeksas yra:
          <br />
          <br />
          <span style={{ color: verdict[1] }}>{bmi} </span>kg/m²
        </h2>
        <button onClick={reset}>Išvalyti</button>
      </div>
    </div>
  );
}

export default App;
