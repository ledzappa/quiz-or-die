import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../api/Api';
import './AddPlayers.css';

export default function AddPlayers({ players, setPlayers }) {
  const [playerInput, setPlayerInput] = useState('');
  const [playerWords, setPlayerWords] = useState([]);
  const history = useHistory();

  useEffect(() => {
    api.getPlayerDescriptionWords().then((res) => setPlayerWords(res.data));
  }, []);

  const addPlayer = (name) => {
    setPlayers([
      ...players,
      {
        name,
        description: getRandomDescription(),
        points: 0,
        isPlayersTurn: false,
        perks: { freedomOfChoice: 0 },
      },
    ]);
    setPlayerInput('');
  };

  const removePlayer = (idx) => {
    setPlayers(players.filter((item, i) => idx !== i));
  };

  const randomizeFirstTurn = () => {
    const randomPlayer = Math.floor(Math.random() * players.length);
    setPlayers(
      players.map((player, idx) => {
        if (randomPlayer === idx) {
          return { ...player, isPlayersTurn: true };
        } else {
          return player;
        }
      })
    );
  };

  const startGame = () => {
    randomizeFirstTurn();
    history.push('/show-turn');
  };

  const handlePlayerInputChange = (value) => setPlayerInput(value);

  const getRandomDescription = () => {
    const nounsLength = playerWords.nouns.length;
    const randomNoun = Math.floor(Math.random() * nounsLength);
    const noun = playerWords.nouns[randomNoun];
    const adjectivesLength = playerWords.adjectives.length;
    const randomAdjective = Math.floor(Math.random() * adjectivesLength);
    const adjective = playerWords.adjectives[randomAdjective];
    return `The ${adjective} ${noun}`;
  };

  return (
    <div>
      <h1>Add players</h1>
      <label>Name:</label>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={playerInput}
          onKeyPress={(e) => e.key === 'Enter' && addPlayer(playerInput)}
          onChange={(e) => handlePlayerInputChange(e.target.value)}
        />
        <button
          className="btn btn-primary"
          onClick={() => addPlayer(playerInput)}
        >
          Add
        </button>
      </div>
      {players.map((player, idx) => (
        <div
          className="added-player"
          key={idx}
          onClick={() => removePlayer(idx)}
        >
          {idx + 1}.{' '}
          <span className="font-weight-bold text-uppercase">{player.name}</span>{' '}
          - {player.description}
        </div>
      ))}
      <hr />
      <button className="btn btn-primary" onClick={() => startGame()}>
        Start Game!
      </button>
    </div>
  );
}
