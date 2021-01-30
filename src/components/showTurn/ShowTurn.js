import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './ShowTurn.css';

export default function ShowTurn({ currentPlayer }) {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => handleClick(), 3000);
  }, []);

  const handleClick = () => {
    const random = Math.random();
    console.log(random);
    history.push(
      random < 0.8
        ? '/perks'
        : random < 0.9
        ? '/round-and-round'
        : '/select-category'
    );
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
