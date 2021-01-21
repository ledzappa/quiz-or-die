import React, { useEffect, useState } from 'react';
import './RoundAndRound.css';

export default function RoundAndRound({ themes, direction, players }) {
  const [theme, setTheme] = useState({});
  const [showTheme, setShowTheme] = useState(false);
  useEffect(() => {
    console.log(themes);
    setTheme(themes[Math.floor(themes.length * Math.random())]);
    console.log(theme);
  }, []);

  const getRandomLetter = () => {
    const letters = 'abcdefghijklmnoprstuvy'.split('');
    return letters[Math.floor(Math.random() * letters.length)];
  };

  const handleClick = () => {
    setShowTheme(true);
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
          <div>
            {theme.description}{' '}
            {theme.randomizeLetter && (
              <span className="font-weight-bold">
                {getRandomLetter().toUpperCase()}
              </span>
            )}
          </div>
          <button className="btn btn-putline-light">Begin!</button>
        </div>
      )}
    </div>
  );
}
