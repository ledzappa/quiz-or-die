import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Player, RoundAndRoundTheme } from '../../interfaces/interfaces';
import './RoundAndRound.css';

export default function RoundAndRound({
  themes,
  players,
}: {
  themes: RoundAndRoundTheme[];
  players: Player[];
}) {
  const [theme, setTheme] = useState({
    description: '',
    randomizeLetter: false,
  });
  const [showTheme, setShowTheme] = useState(false);
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [timer, setTimer] = useState<any>(null);
  const [randomLetter, setRandomLetter] = useState('');
  const [_players, _setPlayers] = useState(players);
  const history = useHistory();

  useEffect(() => {
    setTheme(themes[Math.floor(themes.length * Math.random())]);
    setRandomLetter(getRandomLetter());
  }, []);

  useEffect(() => {
    if (started) {
      updateTime();
    }
  }, [timeLeft]);

  const getRandomLetter = () => {
    const letters = 'abcdefghijklmnoprstuvy'.split('');
    return letters[Math.floor(Math.random() * letters.length)];
  };

  const handleClick = () => {
    setShowTheme(true);
  };

  const updateTime = () => {
    setTimer(
      setTimeout(() => {
        if (timeLeft > 1) {
          setTimeLeft(timeLeft - 1);
        } else {
          nextTurn(true);
        }
      }, 1000)
    );
  };

  const start = () => {
    setStarted(true);
    updateTime();
  };

  const nextTurn = (removeCurrent: boolean) => {
    clearTimeout(timer);

    const players = _players.filter((player: Player) =>
      removeCurrent ? !player.isPlayersTurn : true
    );

    if (players.length === 1) {
      setTimeout(() => history.push('/scoreboard'), 3000);
    }

    const currentTurnIndex = players.findIndex(
      (player: Player) => player.isPlayersTurn
    );
    const nextTurnIndex =
      currentTurnIndex === players.length - 1 ? 0 : currentTurnIndex + 1;

    _setPlayers(
      players.map((player: Player, idx: number) => ({
        ...player,
        isPlayersTurn: nextTurnIndex === idx,
      }))
    );

    if (players.length > 1) {
      setTimeLeft(10);
    }
  };

  return (
    <div>
      <h1>Round and round!</h1>
      <p>
        It's round and round time! Everyone gets 10 seconds to come up with an
        answer for a given theme, for example "Movies from the 90s". Tap the
        screen once you've told your answer and the turn will go over to the
        next player. The player that remains gets 3 points!
      </p>
      <p></p>
      <button className="btn btn-outline-light" onClick={() => handleClick()}>
        Show theme and begin!
      </button>
      {showTheme && (
        <div className="theme-wrapper">
          <h3>
            {theme.description}{' '}
            {theme.randomizeLetter && (
              <span className="font-weight-bold">
                {randomLetter.toLocaleUpperCase()}
              </span>
            )}
          </h3>
          <hr></hr>
          {started ? (
            <div>
              <h2>
                {_players.length > 1
                  ? _players.filter((player: Player) => player.isPlayersTurn)[0]
                      ?.name
                  : _players[0]?.name + ' wins!'}
              </h2>
              <h3>{timeLeft}</h3>
              <button
                className="btn btn-outline-light w-100 p-4 mt-4"
                onClick={() => nextTurn(false)}
                disabled={!(timeLeft < 10)}
              >
                NEXT
              </button>
            </div>
          ) : (
            <button className="btn btn-outline-light" onClick={() => start()}>
              Start!
            </button>
          )}
        </div>
      )}
    </div>
  );
}
