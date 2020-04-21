import React from 'react';
import './InfoBox.scss';

const Info = () => <div className="info-box__icon">i</div>;

export default function InfoBox(props) {
  return (
    <div className="info-box" style={props.style}>
      <Info />
      <div className="info-box__text">{props.text}</div>
    </div>
  );
}
