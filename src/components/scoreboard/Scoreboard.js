import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Scoreboard({ players, setPlayers, direction }) {
  const history = useHistory();

  const handleNextRoundClick = () => {
    const nextTurnIndex = getNextTurnIndex(players, direction);
    let _players = setNextTurn(players, nextTurnIndex);
    _players = reducePlayerPerks(_players);
    setPlayers(_players);
    history.push('/show-turn');
  };

  const getNextTurnIndex = (players, direction) => {
    const currentPlayerIndex = players.findIndex(
      (player) => player.isPlayersTurn
    );

    let nextPlayerIndex = null;
    const isFirstPlayer = currentPlayerIndex === 0;
    const isLastPlayer = currentPlayerIndex === players.length - 1;
    if (direction === 1) {
      nextPlayerIndex = isLastPlayer ? 0 : currentPlayerIndex + direction;
    } else {
      nextPlayerIndex = isFirstPlayer
        ? players.length - 1
        : currentPlayerIndex + direction;
    }

    return nextPlayerIndex;
  };

  const setNextTurn = (players, index) => {
    return players.map((player, idx) => ({
      ...player,
      isPlayersTurn: index === idx,
    }));
  };

  const reducePlayerPerks = (players) => {
    return players.map((player) =>
      player.isPlayersTurn
        ? {
            ...player,
            perks: Object.keys(player.perks).reduce(
              (prev, cur) =>
                player.perks[cur] > 0
                  ? { ...prev, [cur]: player.perks[cur] - 1 }
                  : prev,
              { ...player.perks }
            ),
          }
        : player
    );
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
                player.isPlayersTurn ? 'animate__animated animate__flash' : ''
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
