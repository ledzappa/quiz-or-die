import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Player, RoundAndRoundTheme } from '../../../interfaces/interfaces';
import './RoundAndRound.css';

export default function RoundAndRound({
  themes,
  players,
  setPlayers,
  sounds,
}: {
  themes: RoundAndRoundTheme[];
  players: Player[];
  setPlayers: any;
  sounds: any;
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
  const [roundAndRoundPlayers, setRoundAndRoundPlayers] = useState(players);
  const history = useHistory();

  useEffect(() => {
    sounds.miniGame();
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
    sounds.btn();
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
    sounds.btn();
    setStarted(true);
    updateTime();
  };

  const nextTurn = (removeCurrent: boolean) => {
    sounds.btn();
    clearTimeout(timer);

    const _players = roundAndRoundPlayers.filter((player: Player) =>
      removeCurrent ? !player.isPlayersTurn : true
    );

    if (_players.length === 1) {
      setPlayers(
        players.map((player) =>
          player.name === _players[0].name
            ? {
                ...player,
                points: player.points + 2,
                isMiniGameWinner: true,
              }
            : player
        )
      );
      setTimeout(() => history.push('/scoreboard'), 3000);
    }

    const currentTurnIndex = _players.findIndex(
      (player: Player) => player.isPlayersTurn
    );
    const nextTurnIndex =
      currentTurnIndex === _players.length - 1 ? 0 : currentTurnIndex + 1;

    setRoundAndRoundPlayers(
      _players.map((player: Player, idx: number) => ({
        ...player,
        isPlayersTurn: nextTurnIndex === idx,
      }))
    );

    if (_players.length > 1) {
      setTimeLeft(10);
    } else {
      sounds.applause();
    }
  };

  const isWinner = roundAndRoundPlayers.length === 1;
  return (
    <div>
      <div className="minigame animate__animated animate__rotateIn">
        <h1>It's Round and round time!</h1>
        <p>
          Everyone gets 10 seconds to come up with an answer for a random theme,
          for example "Name a movie from the 90s". Press NEXT when a player
          answers successfully and the turn will go to the next player. If a
          player can't come up with an answer within 10 seconds the player gets
          eliminated. The last player that remains gets 3 points!
        </p>
        <button className="btn btn-outline-light" onClick={() => handleClick()}>
          Show theme and begin!
        </button>
      </div>
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
              {!isWinner ? (
                <button
                  className="btn btn-primary btn-next w-100 p-4 mt-4"
                  onClick={() => nextTurn(false)}
                  disabled={!(timeLeft < 10)}
                >
                  <h1 className="text-uppercase">
                    {
                      roundAndRoundPlayers.filter(
                        (player: Player) => player.isPlayersTurn
                      )[0]?.name
                    }
                  </h1>
                  <h3>{timeLeft}</h3>
                </button>
              ) : (
                <h2 className="animate__animated animate__fadeIn">
                  {roundAndRoundPlayers[0]?.name + ' wins!'}
                </h2>
              )}
            </div>
          ) : (
            <button className="btn btn-primary" onClick={() => start()}>
              Let's go!
            </button>
          )}
        </div>
      )}
    </div>
  );
}
