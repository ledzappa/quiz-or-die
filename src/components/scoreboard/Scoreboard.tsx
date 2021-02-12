import { useHistory } from 'react-router-dom';
import { Direction, Player } from '../../interfaces/interfaces';

export default function Scoreboard({
  players,
  setPlayers,
  direction,
}: {
  players: Player[];
  setPlayers: any;
  direction: Direction;
}) {
  const history = useHistory();

  const handleNextRoundClick = () => {
    if (Math.random() > 0.05) {
      let _players = setNextTurn(players, direction);
      _players = reducePlayerPerks(_players);
      setPlayers(_players);
      history.push('/show-turn');
    } else {
      history.push('/round-and-round');
    }
  };

  return (
    <div>
      <h2>Scoreboard</h2>
      <table className="table text-white">
        <tbody>
          {[...players]
            .sort((a: Player, b: Player) => b.points - a.points)
            .map((player: Player, idx: number) => (
              <tr
                key={idx}
                className={
                  player.isPlayersTurn ? 'animate__animated animate__flash' : ''
                }
              >
                <td className="text-uppercase">
                  {idx + 1}. {player.name}
                </td>
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

export const setNextTurn = (players: Player[], direction: Direction) => {
  const currentPlayerIndex = players.findIndex(
    (player) => player.isPlayersTurn
  );

  let nextIndex = 0;
  const isFirstPlayer = currentPlayerIndex === 0;
  const isLastPlayer = currentPlayerIndex === players.length - 1;
  if (direction === 1) {
    nextIndex = isLastPlayer ? 0 : currentPlayerIndex + direction;
  } else {
    nextIndex = isFirstPlayer
      ? players.length - 1
      : currentPlayerIndex + direction;
  }

  return players.map((player, idx) => ({
    ...player,
    isPlayersTurn: nextIndex === idx,
  }));
};

export const reducePlayerPerks = (players: Player[]) => {
  return players.map((player: any) =>
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
