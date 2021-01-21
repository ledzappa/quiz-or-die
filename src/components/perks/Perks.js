import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Perks.css';

const playerPerks = [
  {
    id: 'double-up',
    name: 'Double up!',
    description: 'You get 2 points for a correct answer on the next question!',
    icon: 'angle-double-up',
  },
  {
    id: 'freedom-of-choice',
    name: 'Freedom of choice!',
    description: 'Chose your category for the next 3 rounds!',
  },
  {
    id: 'poisoned',
    name: 'Poisoned!',
    description:
      'You will lose one point for every wrong answer (active 3 rounds)',
  },
];

const globalPerks = [
  {
    id: 'robin-hood',
    name: 'Robin Hood',
    description:
      'The one with the mosts points generously donates two points to the one with the least points',
  },
  {
    id: 'change-direction',
    name: 'Direction change!',
    description: 'The direction changes after this turn.',
    icon: 'sync',
  },
  {
    id: 'landmine',
    name: 'Landmine!',
    description: 'BOOM! Everyone loses 1 point',
  },
];

export default function Perks({ setDirection, setPlayers, players }) {
  const [perk, setPerk] = useState({});
  const history = useHistory();

  useEffect(() => {
    randomizePerk();
  }, []);

  const randomizePerk = () => {
    const perks = Math.random() < 0.5 ? playerPerks : globalPerks;
    const randomPerkIndex = Math.floor(perks.length * Math.random());
    setPerk(perks[randomPerkIndex]);
    handlePerk(perks[randomPerkIndex].id);
  };

  const handlePerk = (perkId) => {
    switch (perkId) {
      case 'change-direction':
        setDirection();
        break;
      case 'freedom-of-choice':
        setPlayers(
          players.map((player) =>
            player.isPlayersTurn
              ? {
                  ...player,
                  perks: { ...player.perks, freedomOfChoice: 3 },
                }
              : player
          )
        );
        break;
      default:
        break;
    }
  };

  return (
    <div id={perk.id} className="perk-wrapper text-center">
      <div className="pb-5 w-100">
        <div className="perk-icon animate__animated animate__rotateIn">
          <FontAwesomeIcon icon={perk.icon} />
        </div>
        <h1>{perk.name}</h1>
        <p>{perk.description}</p>
        <button
          className="btn btn-outline-light"
          onClick={() => history.push('/select-category')}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
