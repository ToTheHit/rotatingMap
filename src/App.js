import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './app.css';
import mapInfo from './assets/map-info.png';
import Hint from "./Components/Hint/Hint";
import Map from "./Components/Map/Map";

function App() {
  const [clueAngle, setClueAngle] = useState({
    red: 0,
    orange: 0,
    blue: 0,
    green: 0,
  });
  const [clueArrow, setClueArrow] = useState({
    red: true,
    orange: true,
    blue: true,
    green: true,
  });
  const [showAnswer, setShowAnswer] = useState(false);

  function updateHints(arrows, angles) {
    setClueArrow(arrows);
    setClueAngle(angles);
  }

  return (
    <div className="App">
      <Map
        updateHints={updateHints}
        showAnswer={showAnswer}
      />

      <div className="info"
           style={{background: `url(${mapInfo})`}}
      />

      <Hint
        angles={clueAngle}
        directions={clueArrow}
      />

      <button
        className='App__button--answer'
        style={{}}
        onClick={() => {
          alert('Теперь взгляните на карту!');
          setShowAnswer(!showAnswer);
          // let showLine = this.state.showLine;
          // showLine.answer = !showLine.answer;
          // this.setState({showLine})
        }}
      >ОТВЕТ</button>
    </div>
  );
}

export default App;
