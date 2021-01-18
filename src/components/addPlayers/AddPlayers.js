import React, { useState, useEffect } from 'react';
import api from '../../api/Api';
import './AddPlayers.css';

export default function AddPlayers() {
  const [player, setPlayer] = useState('');
  const [players, setPlayers] = useState([]);
  const [playerWords, setPlayerWords] = useState([]);

  useEffect(() => {
    api.getPlayerDescriptionWords().then((res) => setPlayerWords(res.data));
  }, []);

  const addPlayer = (name) => {
    setPlayers([...players, { name, description: getRandomDescription() }]);
    setPlayer('');
  };

  const handlePlayerChange = (value) => setPlayer(value);

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
      <div class="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={player}
          onChange={(e) => handlePlayerChange(e.target.value)}
        />
        <button className="btn btn-primary" onClick={() => addPlayer(player)}>
          Add
        </button>
      </div>
      {players.map((player, idx) => (
        <div className="added-player">
          {idx + 1}. {player.name} - {player.description}
        </div>
      ))}
      <hr />
      <button className="btn btn-primary">Start Game!</button>
    </div>
  );
}
