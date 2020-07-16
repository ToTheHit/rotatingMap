import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './map.css';
import { Line } from 'react-lineto';

import map from '../../assets/map-firewatch.jpg';
import mapGrid from '../../assets/map-grid2.png';
import circleRed from '../../assets/circle-red.png';
import degreesRed from '../../assets/degrees-red.png';
import circleOrange from '../../assets/circle-orange.png';
import degreesOrange from '../../assets/degrees-orange.png';
import circleBlue from '../../assets/circle-blue.png';
import degreesBlue from '../../assets/degrees-blue.png';
import circleGreen from '../../assets/circle-green.png';
import degreesGreen from '../../assets/degrees.png';

const Map = (props) => {
  const { updateHints, showAnswer } = props;
  const [prevRotate, setPrevRotate] = useState({
    red: 0,
    orange: 0,
    blue: 0,
    green: 0,
  });
  const [rotate, setRotate] = useState({
    red: 0,
    orange: 0,
    blue: 0,
    green: 0,
  });

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
  const [answerFirstLine, setAnswerFirstLine] = useState({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  });
  const [answerSecondLine, setAnswerSecondLine] = useState({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  });
  const [firstLine, setFirstLine] = useState({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  });
  const [secondLine, setSecondLine] = useState({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  });
  const [activeFigure, setActiveFigure] = useState({
    red: false,
    orange: false,
    blue: false,
    green: false,
  });

  const redFigure = useRef(null);
  const orangeFigure = useRef(null);
  const blueFigure = useRef(null);
  const greenFigure = useRef(null);

  useEffect(() => {
    let redRandom = ~~(Math.random() * 360),
      orangeRandom = ~~(Math.random() * 360),
      blueRandom = ~~(Math.random() * 360),
      greenRandom = ~~(Math.random() * 360);

    let clueAngle = {
      red: (redRandom > 180 ? redRandom - 360 : redRandom),
      orange: (orangeRandom > 180 ? orangeRandom - 360 : orangeRandom),
      blue: (blueRandom > 180 ? blueRandom - 360 : blueRandom),
      green: (greenRandom > 180 ? greenRandom - 360 : greenRandom),
    };

    let rotate = {
      red: -clueAngle.red,
      orange: -clueAngle.orange,
      blue: -clueAngle.blue,
      green: -clueAngle.green
    };

    let clueArrow = {
      red: clueAngle.red > 0,
      blue: clueAngle.blue > 0,
      green: clueAngle.green > 0,
      orange: clueAngle.orange > 0,
    };

    clueAngle = {
      red: (clueAngle.red < 0 ? -clueAngle.red : clueAngle.red),
      blue: (clueAngle.blue < 0 ? -clueAngle.blue : clueAngle.blue),
      green: (clueAngle.green < 0 ? -clueAngle.green : clueAngle.green),
      orange: (clueAngle.orange < 0 ? -clueAngle.orange : clueAngle.orange)
    };

    setClueAngle(clueAngle);
    setClueArrow(clueArrow);
    setRotate(rotate);

  }, []);

  function intersectionPoint(x11, x12, y11, y12, x21, x22, y21, y22) {
    let a1 = y11 - y12, b1 = x12 - x11;
    let a2 = y21 - y22, b2 = x22 - x21;
    let d = a1 * b2 - a2 * b1;
    if (d === 0) d = 0.00000000001;
    if (d !== 0) {
      let c1 = y12 * x11 - x12 * y11;
      let c2 = y22 * x21 - x22 * y21;

      // Точка пересечения с левой границей
      let xLeft = (b1 * c2 - b2 * c1) / d;
      let yLeft = (a2 * c1 - a1 * c2) / d;
      return [xLeft, yLeft];
    }

  }

  function getLineCoords(x11, y11, x12, y12,) {
    let x21, y21, x22, y22,
      x31, y31, x32, y32,
      x41, y41, x42, y42,
      x51, y51, x52, y52,
      res;
    let line = {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
    };
    x21 = 75;
    y21 = 1415;
    x22 = 75;
    y22 = 75; //left border
    x31 = 1415;
    y31 = 1415;
    x32 = 1415;
    y32 = 75; //right border
    x41 = 75;
    y41 = 75;
    x42 = 1415;
    y42 = 75; // top border
    x51 = 75;
    y51 = 1415;
    x52 = 1415;
    y52 = 1415; // bottom border

    res = intersectionPoint(x11, x12, y11, y12, x21, x22, y21, y22); // get cross with left border
    line.x1 = res[0];
    line.y1 = res[1];
    res = intersectionPoint(x11, x12, y11, y12, x41, x42, y41, y42); // get cross with top border
    if (line.y1 < res[1]) {
      line.x1 = res[0];
      line.y1 = res[1];
    }
    res = intersectionPoint(x11, x12, y11, y12, x51, x52, y51, y52); // get cross with bottom border
    if (line.y1 > res[1]) {
      line.x1 = res[0];
      line.y1 = res[1];
    }

    res = intersectionPoint(x11, x12, y11, y12, x31, x32, y31, y32);
    line.x2 = res[0];
    line.y2 = res[1];
    res = intersectionPoint(x11, x12, y11, y12, x41, x42, y41, y42); // get cross with top border
    if (line.y2 < res[1]) {
      line.x2 = res[0];
      line.y2 = res[1];
    }
    res = intersectionPoint(x11, x12, y11, y12, x51, x52, y51, y52); // get cross with bottom border
    if (line.y2 > res[1]) {
      line.x2 = res[0];
      line.y2 = res[1];
    }

    return line;
  }

  useEffect(() => {
    if (!clueAngle.red && !clueAngle.blue && !clueAngle.orange && !clueAngle.green) return;
    let x11, y11, x12, y12, res;

    x11 = redFigure.current.getBoundingClientRect().x + window.pageXOffset + 14;
    y11 = redFigure.current.getBoundingClientRect().y + window.pageYOffset + 12;
    x12 = orangeFigure.current.getBoundingClientRect().x + window.pageXOffset + 14;
    y12 = orangeFigure.current.getBoundingClientRect().y + window.pageYOffset + 12;

    const firstLine = getLineCoords(x11, y11, x12, y12);

    x11 = blueFigure.current.getBoundingClientRect().x + window.pageXOffset + 14;
    y11 = blueFigure.current.getBoundingClientRect().y + window.pageYOffset + 12;
    x12 = greenFigure.current.getBoundingClientRect().x + window.pageXOffset + 14;
    y12 = greenFigure.current.getBoundingClientRect().y + window.pageYOffset + 12;

    const secondLine = getLineCoords(x11, y11, x12, y12);
    res = intersectionPoint(firstLine.x1, firstLine.x2, firstLine.y1, firstLine.y2, secondLine.x1, secondLine.x2, secondLine.y1, secondLine.y2);

    let blueRandom, greenRandom, counter = 0;
    let dist = Math.sqrt(Math.pow((650 - res[0]), 2) + Math.pow((650 - res[1]), 2));

    if (dist > 590) {
      blueRandom = ~~(Math.random() * 360);
      blueRandom = (blueRandom > 180 ? blueRandom - 360 : blueRandom);
      greenRandom = ~~(Math.random() * 360);
      greenRandom = (greenRandom > 180 ? greenRandom - 360 : greenRandom);

      setClueAngle({
        ...clueAngle,
        blue: blueRandom,
        green: greenRandom,
      });
      setRotate({
        ...rotate,
        blue: -blueRandom,
        green: -greenRandom,
      })
      setClueArrow({
        ...clueArrow,
        blue: blueRandom > 0,
        green: greenRandom > 0,
      })
    } else {
      setRotate({
        red: 0,
        orange: 0,
        blue: 0,
        green: 0,
      });
      setPrevRotate({
        red: 0,
        orange: 0,
        blue: 0,
        green: 0,
      })
      updateHints(clueArrow, clueAngle);

      setAnswerFirstLine(firstLine);
      setAnswerSecondLine(secondLine);
    }

  }, [clueAngle]);

  useEffect(() => {
    if (activeFigure.red && activeFigure.orange) {
      let x11, y11, x12, y12;
      x11 = redFigure.current.getBoundingClientRect().x + window.pageXOffset + 14;
      y11 = redFigure.current.getBoundingClientRect().y + window.pageYOffset + 12;
      x12 = orangeFigure.current.getBoundingClientRect().x + window.pageXOffset + 14;
      y12 = orangeFigure.current.getBoundingClientRect().y + window.pageYOffset + 12;
      setFirstLine(getLineCoords(x11, y11, x12, y12));
    }
    if (activeFigure.blue && activeFigure.green) {
      let x11, y11, x12, y12;
      x11 = blueFigure.current.getBoundingClientRect().x + window.pageXOffset + 14;
      y11 = blueFigure.current.getBoundingClientRect().y + window.pageYOffset + 12;
      x12 = greenFigure.current.getBoundingClientRect().x + window.pageXOffset + 14;
      y12 = greenFigure.current.getBoundingClientRect().y + window.pageYOffset + 12;
      setSecondLine(getLineCoords(x11, y11, x12, y12));
    }
  }, [activeFigure]);

  let isDragging = false;
  let draggingCircle = 'red';
  let draggingCenter = {
    x: 0,
    y: 0,
  };
  let draggingStartAngle = 0;

  const startRotateCircle = useCallback((e, circle) => {
    if (e.target.getAttribute('data-isfigure')) return;

    e.preventDefault();
    let refT = null;
    switch (circle) {
      case 'red': {refT = redFigure.current; break;}
      case 'orange': {refT = orangeFigure.current; break;}
      case 'blue': {refT = blueFigure.current; break;}
      case 'green': {refT = greenFigure.current; break;}
      default: break;
    }
    let _ref = e.target.getBoundingClientRect(), top = _ref.top, left = _ref.left,
      height = _ref.height, width = _ref.width;
    let center = {
      x: left + (width / 2),
      y: top + (height / 2)
    };

    let x = e.clientX - center.x;
    let y = e.clientY - center.y;
    let startAngle = 180 / Math.PI * Math.atan2(y, x);
    isDragging = true;
    draggingCircle = circle;
    draggingCenter = center;
    draggingStartAngle = startAngle;
  }, [rotate]);

  const rotateCircle = useCallback((e) => {
    if (isDragging) {
      let d, x, y;
      // e.preventDefault();
      x = e.clientX - draggingCenter.x;
      y = e.clientY - draggingCenter.y;
      d = 180 / Math.PI * Math.atan2(y, x);
      let rotation = d - draggingStartAngle;
      let angle = prevRotate[draggingCircle];
      let newAngle = angle + rotation;

      setPrevRotate({
        ...prevRotate,
        [draggingCircle]: newAngle,
      });
    }
  }, [rotate])

  const stopRotating = useCallback(() => {
    isDragging = false;
    setRotate(prevRotate);
  }, [prevRotate]);

  function activateFigure(figure) {
    setActiveFigure({
      ...activeFigure,
      [figure]: !activeFigure[figure],
    });
  }

  return (
    <div className={'Map'}
         style={{ backgroundImage: `url(${map})` }}
         onMouseMove={(e) => rotateCircle(e)}
    >
      {showAnswer && (
        <>
          <Line
            x0={answerFirstLine.x1}
            x1={answerFirstLine.x2}
            y0={answerFirstLine.y1}
            y1={answerFirstLine.y2}
            zIndex={5}
            borderColor='red'
            borderWidth={2}
            className="Line"
          />
          <Line
            x0={answerSecondLine.x1}
            x1={answerSecondLine.x2}
            y0={answerSecondLine.y1}
            y1={answerSecondLine.y2}
            zIndex={5}
            borderColor='red'
            borderWidth={2}
            className="Line"
          />
        </>
      )}

      {(activeFigure.red && activeFigure.orange) && (
        <Line
          x0={firstLine.x1}
          x1={firstLine.x2}
          y0={firstLine.y1}
          y1={firstLine.y2}
          zIndex={5}
          borderColor='black'
          borderWidth={2}
          className="Line"
        />
      )}
      {(activeFigure.blue && activeFigure.green) && (
        <Line
          x0={secondLine.x1}
          x1={secondLine.x2}
          y0={secondLine.y1}
          y1={secondLine.y2}
          zIndex={5}
          borderColor='black'
          borderWidth={2}
          className="Line"
        />
      )}

      <div className="Map__grid"
           style={{ backgroundImage: `url(${mapGrid})` }}
      />
      <div className="Map__circle">
        <div className="Map__circle--red"
             style={{
               backgroundImage: `url(${circleRed})`,
               transform: `rotate(${prevRotate.red}deg)`,
             }}
        />

        <div className="Map__circle--orange"
             style={{
               backgroundImage: `url(${circleOrange})`,
               transform: `rotate(${prevRotate.orange}deg)`,
             }}
        />

        <div className="Map__circle--blue"
             style={{
               backgroundImage: `url(${circleBlue})`,
               transform: `rotate(${prevRotate.blue}deg)`,
             }}
        />

        <div className="Map__circle--green"
             style={{
               backgroundImage: `url(${circleGreen})`,
               transform: `rotate(${prevRotate.green}deg)`,
             }}
        />
      </div>

      <div className="Map__degrees">
        <div className="Map__degrees--red"
             style={{ backgroundImage: `url(${degreesRed})` }}
        >
          <div className="Map__degrees--red__inv"
               onMouseDown={(e) => startRotateCircle(e, 'red')}
               onMouseUp={() => stopRotating()}
               style={{
                 transform: `rotate(${rotate.red}deg)`,
               }}
          >
            <div className="Map__degrees--red__inv-figure"
                 style={{ border: (activeFigure.red ? '2px solid red' : '') }}
                 ref={redFigure}
                 data-isfigure={true}
                 onClick={() => {
                   activateFigure('red');
                 }}
            />
          </div>
        </div>
        <div className="Map__degrees--orange"
             style={{ backgroundImage: `url(${degreesOrange})` }}
        >
          <div className="Map__degrees--orange__inv"
               onMouseDown={(e) => startRotateCircle(e, 'orange')}
               onMouseUp={() => stopRotating()}
               style={{
                 transform: `rotate(${rotate.orange}deg)`,
               }}
          >
            <div className="Map__degrees--orange__inv-figure"
                 style={{ border: (activeFigure.orange ? '2px solid orange' : '') }}
                 data-isfigure={true}
                 ref={orangeFigure}
                 onClick={() => {
                   activateFigure('orange');
                 }}
            />
          </div>
        </div>

        <div className="Map__degrees--blue"
             style={{ backgroundImage: `url(${degreesBlue})` }}
        >
          <div className="Map__degrees--blue__inv"
               onMouseDown={(e) => startRotateCircle(e, 'blue')}
               onMouseUp={() => stopRotating()}
               style={{
                 transform: `rotate(${rotate.blue}deg)`,
               }}
          >
            <div className="Map__degrees--blue__inv-figure"
                 style={{ border: (activeFigure.blue ? '2px solid blue' : '') }}
                 ref={blueFigure}
                 data-isfigure={true}
                 onClick={() => {
                   activateFigure('blue');
                 }}
            />
          </div>
        </div>
        <div className="Map__degrees--green"
             style={{ backgroundImage: `url(${degreesGreen})` }}
        >
          <div className="Map__degrees--green__inv"
               onMouseDown={(e) => startRotateCircle(e, 'green')}
               onMouseUp={() => stopRotating()}
               style={{
                 transform: `rotate(${rotate.green}deg)`,
               }}
          >
            <div className="Map__degrees--green__inv-figure"
                 style={{ border: (activeFigure.green ? '2px solid green' : '') }}
                 ref={greenFigure}
                 data-isfigure={true}
                 onClick={() => {
                   activateFigure('green');
                 }}
            />
          </div>
        </div>
      </div>


    </div>
  )
};

Map.propTypes = {
  updateHints: PropTypes.func.isRequired,
  showAnswer: PropTypes.bool.isRequired,
};
Map.defaultProps = {};
export default Map;