import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Scoreboard({
  players,
  currentPlayer,
  setCurrentPlayer,
}) {
  const history = useHistory();
  const handleNextRoundClick = () => {
    const currentPlayerIndex = players.findIndex(
      (player) => currentPlayer.name === player.name
    );
    const nextPlayerIndex =
      currentPlayerIndex === players.length - 1 ? 0 : currentPlayerIndex + 1;
    setCurrentPlayer(players[nextPlayerIndex]);
    history.push('select-category');
  };

  return (
    <div>
      <h2>Scoreboard:</h2>
      <table className="table text-white">
        <tbody>
          {players.map((player, idx) => (
            <tr
              key={idx}
              className={
                currentPlayer.name === player.name
                  ? 'animate__animated animate__flash'
                  : ''
              }
            >
              <td>{player.name}</td>
              <td className="text-right">{player.points}p</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => handleNextRoundClick()}
        className="btn btn-primary"
      >
        Next round!
      </button>
    </div>
  );
}
