import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Direction, Player, Settings } from '../../interfaces/interfaces';
import './Scoreboard.css';

export default function Scoreboard({
  players,
  setPlayers,
  direction,
  settings,
  isMiniGame,
  setIsMiniGame,
  sounds,
}: {
  players: Player[];
  direction: Direction;
  isMiniGame: boolean;
  settings: Settings;
  setPlayers: Function;
  setIsMiniGame: Function;
  sounds: any;
}) {
  const [winner, setWinner] = useState<Player>();
  const [showWinner, setShowWinner] = useState(false);
  useEffect(() => {
    const winner = players.filter(
      (player) => player.points >= settings.pointsToWin
    )[0];
    setWinner(winner);
    if (winner) {
      setTimeout(() => {
        setShowWinner(true);
        sounds.playerWins();
      }, 3000);
    }
  }, []);
  const history = useHistory();

  const handleNextRoundClick = () => {
    sounds.btn();
    if (
      settings.enabledMiniGames.length === 0 ||
      Math.random() > settings.probMiniGame ||
      isMiniGame
    ) {
      let _players = setNextPlayersTurn(players, direction);
      _players = reduceCurrentPlayersPerksByOne(_players);
      _players = resetMiniGameWinner(_players);
      setPlayers(_players);
      setIsMiniGame(false);
      history.push('/show-turn');
    } else {
      setIsMiniGame(true);
      const random = Math.random();
      history.push(
        random < 0.45
          ? '/round-and-round'
          : random < 0.92
          ? '/closest-wins'
          : '/trigger-finger'
      );
    }
  };

  const handlePlayAgainClick = () => {
    setPlayers([]);
    history.push('/home');
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
                  shouldAnimatePlayerRow(player, isMiniGame)
                    ? 'animate__animated animate__flash'
                    : ''
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
      {!winner && (
        <div className="text-center pt-5">
          <button
            onClick={() => handleNextRoundClick()}
            className="btn btn-primary px-3 py-3"
          >
            Next round <FontAwesomeIcon className="ml-2" icon="arrow-right" />
          </button>
        </div>
      )}
      {showWinner && (
        <div className="winner-wrapper animate__animated animate__fadeIn">
          <div className="pb-5 w-100">
            <div className="perk-icon animate__animated animate__rotateIn">
              <FontAwesomeIcon icon={'trophy'} />
            </div>
            <h1 className="mb-5">{winner?.name} wins!</h1>
            <button
              className="btn btn-outline-light"
              onClick={handlePlayAgainClick}
            >
              Play again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export const shouldAnimatePlayerRow = (player: Player, isMiniGame: boolean) =>
  isMiniGame ? player.isMiniGameWinner : player.isPlayersTurn;

export const resetMiniGameWinner = (players: Player[]) => {
  return players.map((player) => ({ ...player, isMiniGameWinner: false }));
};

export const setNextPlayersTurn = (players: Player[], direction: Direction) => {
  let nextIndex = 0;
  const currentPlayerIndex = players.findIndex(
    (player) => player.isPlayersTurn
  );
  const lastPlayerIndex = players.length - 1;
  const isFirstPlayer = currentPlayerIndex === 0;
  const isLastPlayer = currentPlayerIndex === lastPlayerIndex;

  if (direction === 1) {
    nextIndex = isLastPlayer ? 0 : currentPlayerIndex + direction;
  } else {
    nextIndex = isFirstPlayer
      ? lastPlayerIndex
      : currentPlayerIndex + direction;
  }

  return players.map((player, idx) => ({
    ...player,
    isPlayersTurn: nextIndex === idx,
  }));
};

export const reduceCurrentPlayersPerksByOne = (players: Player[]) => {
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
