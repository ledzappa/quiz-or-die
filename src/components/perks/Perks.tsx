import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Perks.css';
import { Perk, Player } from '../../interfaces/interfaces';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const playerPerks = [
  {
    id: 'double-up',
    name: 'Double up!',
    description:
      'Yay! You get 2 points for a correct answer on the next question.',
    icon: 'angle-double-up',
  },
  {
    id: 'freedom-of-choice',
    name: 'Freedom of choice!',
    description: 'Choose your category for the next 3 rounds.',
  },
];

const globalPerks = [
  {
    id: 'robin-hood',
    name: 'Robin Hood',
    description: '#generated#',
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

export default function Perks({
  setDirection,
  setPlayers,
  players,
  playGoodPerkSound,
}: any) {
  const [perk, setPerk] = useState<Perk>({
    id: '',
    name: '',
    description: '',
    icon: '',
  });
  const history = useHistory();

  useEffect(() => {
    randomizePerk();
  }, []);

  const randomizePerk = () => {
    const perks = Math.random() < 0.6 ? playerPerks : globalPerks;
    const randomPerkIndex = Math.floor(perks.length * Math.random());
    const perk = perks[randomPerkIndex] as Perk;
    setPerk(perk);
    playGoodPerkSound();
  };

  const updatePlayerPerks = (perkName: string, count: number) => {
    setPlayers(
      players.map((player: Player) =>
        player.isPlayersTurn
          ? {
              ...player,
              perks: { ...player.perks, [perkName]: count },
            }
          : player
      )
    );
  };

  const getRobinHoodText = (players: Player[]): string => {
    let minPoints = 100;
    let maxPoints = -100;
    let minPlayerName = '';
    let maxPlayerName = '';
    players.forEach((player) => {
      if (player.points < minPoints) {
        minPoints = player.points;
        minPlayerName = player.name;
      }
      if (player.points > maxPoints) {
        maxPoints = player.points;
        maxPlayerName = player.name;
      }
    });
    return `${maxPlayerName} generously donates 1 point to ${minPlayerName}`;
  };

  const subtractPlayerPoints = (players: Player[]) => {
    return players.map((player) => ({ ...player, points: player.points - 1 }));
  };

  const switchPlayerPoints = (players: Player[]) => {
    let minPoints = 100;
    let maxPoints = -100;
    let minPointsIdx = 0;
    let maxPointsIdx = 0;

    players.forEach((player, idx) => {
      if (player.points < minPoints) {
        minPoints = player.points;
        minPointsIdx = idx;
      }
      if (player.points > maxPoints) {
        maxPoints = player.points;
        maxPointsIdx = idx;
      }
    });

    return players.map((player, idx) => {
      if (idx === minPointsIdx) {
        return { ...player, points: player.points + 1 };
      }
      if (idx === maxPointsIdx) {
        return { ...player, points: player.points - 1 };
      }
      return player;
    });
  };

  const activatePerk = (perkId: string) => {
    switch (perkId) {
      case 'change-direction':
        setDirection();
        break;
      case 'freedom-of-choice':
        updatePlayerPerks('freedomOfChoice', 3);
        break;
      case 'double-up':
        updatePlayerPerks('doubleUp', 1);
        break;
      case 'robin-hood':
        setPlayers(switchPlayerPoints(players));
        break;
      case 'landmine':
        setPlayers(subtractPlayerPoints(players));
        break;
      default:
        break;
    }
  };

  const handleContinueClick = () => {
    activatePerk(perk.id);
    history.push('/select-category');
  };

  return (
    <div id={perk.id} className="perk-wrapper text-center">
      <div className="pb-5 w-100">
        <div className="perk-icon animate__animated animate__rotateIn">
          <FontAwesomeIcon icon={perk.icon as IconProp} />
        </div>
        <h1>{perk.name}</h1>
        <p>
          {perk.id === 'robin-hood'
            ? getRobinHoodText(players)
            : perk.description}
        </p>
        <button className="btn btn-outline-light" onClick={handleContinueClick}>
          Continue
        </button>
      </div>
    </div>
  );
}
