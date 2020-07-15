import React from 'react';
import PropTypes from 'prop-types';
import './hint.css';
import layout from '../../assets/clue-layout.png';
import arrowLeft from '../../assets/arrow-left.png';
import arrowRight from '../../assets/arrow-right.png';
import redClue from '../../assets/red-clue.png';
import blueClue from '../../assets/blue-clue.png';
import greenClue from '../../assets/green-clue.png';
import orangeClue from '../../assets/orange-clue.png';

const Hint = (props) => {
  const { angles, directions } = props;
  return (
    <div className={'Hint'}>
      <div className="Hint__item"
          style={{background: `url(${layout})`}}
      >
        <div className="Hint__arrow"
             style={{background: `url(${(directions.red ? arrowLeft : arrowRight)})`}}
        />
        <div className="Hint__figure"
             style={{background: `url(${redClue}) no-repeat`}}
        >
          <div className="Hint__figure--text">
            {angles.red}
          </div>
        </div>
      </div>

      <div className="Hint__item"
           style={{background: `url(${layout})`}}
      >
        <div className="Hint__arrow"
             style={{background: `url(${(directions.orange ? arrowLeft : arrowRight)})`}}
        />
        <div className="Hint__figure"
             style={{background: `url(${orangeClue}) no-repeat`}}
        >
          <div className="Hint__figure--text">
            {angles.orange}
          </div>
        </div>
      </div>

      <div className="Hint__item"
           style={{background: `url(${layout})`}}
      >
        <div className="Hint__arrow"
             style={{background: `url(${(directions.blue ? arrowLeft : arrowRight)})`}}
        />
        <div className="Hint__figure"
             style={{background: `url(${blueClue}) center 25px no-repeat`}}
        >
          <div className="Hint__figure--text">
            {angles.blue}
          </div>
        </div>
      </div>

      <div className="Hint__item"
           style={{background: `url(${layout})`}}
      >
        <div className="Hint__arrow"
             style={{background: `url(${(directions.green ? arrowLeft : arrowRight)})`}}
        />
        <div className="Hint__figure"
             style={{background: `url(${greenClue}) center 25px no-repeat`}}
        >
          <div className="Hint__figure--text">
            {angles.green}
          </div>
        </div>
      </div>
    </div>
  )
};

Hint.propTypes = {
  angles: PropTypes.shape({
    red: PropTypes.number,
    orange: PropTypes.number,
    blue: PropTypes.number,
    green: PropTypes.number,
  }).isRequired,
  directions: PropTypes.shape({
    red: PropTypes.bool,
    orange: PropTypes.bool,
    blue: PropTypes.bool,
    green: PropTypes.bool
  }).isRequired,
};
Hint.defaultProps = {};
export default Hint;