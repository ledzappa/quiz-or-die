import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import api from '../../api/Api';
import { Player } from '../../interfaces/interfaces';
import './AddPlayers.css';

export default function AddPlayers({ players, setPlayers, sounds }: any) {
  const [playerInput, setPlayerInput] = useState('');
  const [playerWords, setPlayerWords] = useState({ nouns: [], adjectives: [] });
  const history = useHistory();

  useEffect(() => {
    api.getPlayerDescriptionWords().then((res) => setPlayerWords(res.data));
  }, []);

  const addPlayer = (name: String) => {
    setPlayers([
      ...players,
      {
        name,
        description: getRandomDescription(),
        points: 0,
        isPlayersTurn: false,
        isMiniGameWinner: false,
        perks: { freedomOfChoice: 0, doubleUp: 0 },
      },
    ]);
    setPlayerInput('');
  };

  const removePlayer = (idx: Number) => {
    setPlayers(players.filter((_: any, i: Number) => idx !== i));
  };

  const randomizeFirstTurn = () => {
    const randomPlayer = Math.floor(Math.random() * players.length);
    setPlayers(
      players.map((player: Player, idx: Number) => {
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
    sounds.btn();
    history.push('/show-turn');
    // history.push('/closest-wins');
    // history.push('/trigger-finger');
  };

  const handlePlayerInputChange = (value: string) => setPlayerInput(value);

  const getRandomDescription = () => {
    const nounsLength = playerWords.nouns.length;
    const randomNoun = Math.floor(Math.random() * nounsLength);
    const noun = playerWords.nouns[randomNoun];
    const adjectivesLength = playerWords.adjectives.length;
    const randomAdjective = Math.floor(Math.random() * adjectivesLength);
    const adjective = playerWords.adjectives[randomAdjective];
    return `The ${adjective} ${noun}`;
  };

  const updateDescription = (name: string) => {
    setPlayers(
      players.map((player: Player) =>
        player.name === name
          ? { ...player, description: getRandomDescription() }
          : player
      )
    );
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-sm-6 col-lg-6 col-xl-4">
        <h2>Add players</h2>
        <p>Enter a name and press enter or the "Add" button.</p>
        <label>Name</label>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control add-player"
            value={playerInput}
            autoFocus
            onKeyPress={(e) => e.key === 'Enter' && addPlayer(playerInput)}
            onChange={(e) => handlePlayerInputChange(e.target.value)}
          />
          <button
            className="btn btn-primary"
            onClick={() => addPlayer(playerInput)}
          >
            <FontAwesomeIcon icon="plus" />
          </button>
        </div>
        {players.map((player: Player, idx: number) => (
          <div className="added-player-wrapper" key={idx}>
            <div
              className="d-inline-block"
              onClick={() => updateDescription(player.name)}
            >
              <span className="font-weight-bold text-uppercase">
                {player.name}
              </span>{' '}
              <div>{player.description}</div>
            </div>
            <FontAwesomeIcon
              className="ml-3 float-right"
              icon="times"
              onClick={() => removePlayer(idx)}
            />
          </div>
        ))}
        <hr />
        <button
          className="btn btn-primary w-100 start-game"
          onClick={() => startGame()}
          disabled={players.length < 2}
        >
          Start Game!
        </button>
      </div>
    </div>
  );
}
