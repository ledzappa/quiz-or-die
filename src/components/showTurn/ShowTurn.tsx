import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Player } from '../../interfaces/interfaces';
import './ShowTurn.css';

export default function ShowTurn({ currentPlayer }: { currentPlayer: Player }) {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => handleClick(), 3000);
  }, []);

  const handleClick = () => {
    const random = Math.random();
    history.push(random < 0.1 ? '/perks' : '/select-category');
  };

  return (
    <div className="show-turn-wrapper">
      <div className="w-100">
        <h1 className="text-uppercase">{currentPlayer.name}</h1>
        <h3>"{currentPlayer.description}"</h3>
        <hr></hr>
        <h2>You're next!</h2>
      </div>
    </div>
  );
}
