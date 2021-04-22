import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Perks.css';
import { Perk, Player, Settings } from '../../interfaces/interfaces';
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
    icon: 'hand-sparkles',
  },
  {
    id: 'landmine',
    name: 'Landmine!',
    description: 'BOOM! You lose 1 point if you answer wrong.',
    icon: 'bomb',
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
];

export default function Perks({
  setDirection,
  setPlayers,
  settings,
  players,
  sounds,
}: {
  setDirection: Function;
  setPlayers: Function;
  settings: Settings;
  players: Player[];
  sounds: any;
}) {
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
    const perks =
      Math.random() < settings.probPlayerPerk ? playerPerks : globalPerks;
    const randomPerkIndex = Math.floor(perks.length * Math.random());
    const perk = perks[randomPerkIndex] as Perk;
    if (perk.id === 'robin-hood' && !isRobinHoodEnabled(players)) {
      randomizePerk();
      return;
    }

    if (perk.id === 'change-direction' && !isChangeDirectionEnabled(players)) {
      randomizePerk();
      return;
    }

    setPerk(perk);
    sounds.goodPerk();
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
        updatePlayerPerks('landmine', 1);
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
        <button className="btn btn-secondary" onClick={handleContinueClick}>
          Continue
        </button>
      </div>
    </div>
  );
}

export const subtractPointFromAllPlayers = (players: Player[]) => {
  return players.map((player) => ({ ...player, points: player.points - 1 }));
};

export const isChangeDirectionEnabled = (players: Player[]) => {
  return players.length >= 3;
};

export const isRobinHoodEnabled = (players: Player[]) => {
  const maxPoints = Math.max(...players.map((player) => player.points));
  const minPoints = Math.min(...players.map((player) => player.points));
  const minAndMaxAreUnique =
    players.filter((player) => player.points === maxPoints).length === 1 &&
    players.filter((player) => player.points === minPoints).length === 1;
  return maxPoints !== minPoints && minAndMaxAreUnique;
};

export const getRobinHoodText = (players: Player[]): string => {
  const maxPoints = Math.max(...players.map((player) => player.points));
  const minPoints = Math.min(...players.map((player) => player.points));
  const maxPlayerName = players.filter(
    (player) => player.points === maxPoints
  )[0].name;
  const minPlayerName = players.filter(
    (player) => player.points === minPoints
  )[0].name;
  return `${maxPlayerName} generously donates 1 point to ${minPlayerName}`;
};

export const switchPlayerPoints = (players: Player[]) => {
  const maxPoints = Math.max(...players.map((player) => player.points));
  const minPoints = Math.min(...players.map((player) => player.points));
  return players.map((player) => {
    if (player.points === minPoints) {
      return { ...player, points: player.points + 1 };
    }
    if (player.points === maxPoints) {
      return { ...player, points: player.points - 1 };
    }
    return player;
  });
};
