import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Player, Settings } from '../../interfaces/interfaces';
import './ShowTurn.css';

export default function ShowTurn({
  currentPlayer,
  settings,
}: {
  currentPlayer: Player;
  settings: Settings;
}) {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push(
        Math.random() < settings.probPerk ? '/perks' : '/select-category'
      );
    }, 3000);
  }, []);

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
