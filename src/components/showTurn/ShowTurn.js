import React from 'react';
import { useHistory } from 'react-router-dom';
import './ShowTurn.css';

export default function ShowTurn({ currentPlayer }) {
  const history = useHistory();

  const handleClick = () => {
    history.push(Math.random() > 0.8 ? '/select-category' : '/perks');
  };

  return (
    <div className="show-turn-wrapper" onClick={() => handleClick()}>
      <div className="w-100">
        <h1 className="text-uppercase">{currentPlayer.name}</h1>
        <h3>{currentPlayer.description}</h3>
        <hr></hr>
        <h2>It's your turn!</h2>
      </div>
    </div>
  );
}
