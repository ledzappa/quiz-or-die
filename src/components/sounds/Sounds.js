import React, { useEffect } from 'react';
import useSound from 'use-sound';
import goodPerk from '../../sounds/goodPerk.mp3';
import button from '../../sounds/button.mp3';
import click from '../../sounds/robots.mp3';
import countdown from '../../sounds/countdown.mp3';
import trigger from '../../sounds/trigger.mp3';
import tooearly from '../../sounds/tooearly.mp3';
import playerWins from '../../sounds/playerWins.mp3';
import miniGame from '../../sounds/miniGame.mp3';
import applause from '../../sounds/applause.mp3';
import landmine from '../../sounds/landmine.mp3';
import changeDirection from '../../sounds/changeDirection.mp3';

export default function Sounds({ sounds, setSounds }) {
  const soundConfig = { volume: 1 };
  const [playBtnSound] = useSound(button, soundConfig);
  const [playGoodPerkSound] = useSound(goodPerk, soundConfig);
  const [playTriggerSound] = useSound(trigger, soundConfig);
  const [playCountdownSound] = useSound(countdown, soundConfig);
  const [playTooEarlySound] = useSound(tooearly, soundConfig);
  const [playClickSound] = useSound(click, soundConfig);
  const [playPlayerWins] = useSound(playerWins, soundConfig);
  const [playMiniGame] = useSound(miniGame, soundConfig);
  const [playApplause] = useSound(applause, soundConfig);
  const [playLandmine] = useSound(landmine, soundConfig);
  const [playChangeDirection] = useSound(changeDirection, soundConfig);

  useEffect(() => {
    if (!sounds) {
      setSounds(() => ({
        btn: () => playBtnSound(),
        goodPerk: () => playGoodPerkSound(),
        trigger: () => playTriggerSound(),
        countdown: () => playCountdownSound(),
        tooEarly: () => playTooEarlySound(),
        click: () => playClickSound(),
        playerWins: () => playPlayerWins(),
        miniGame: () => playMiniGame(),
        applause: () => playApplause(),
        landmine: () => playLandmine(),
        changeDirection: () => playChangeDirection(),
      }));
    }
  }, [
    playBtnSound,
    playGoodPerkSound,
    playTriggerSound,
    playCountdownSound,
    playTooEarlySound,
    playClickSound,
    playPlayerWins,
    playMiniGame,
    playApplause,
    playLandmine,
    playChangeDirection,
    setSounds,
    sounds,
  ]);

  return <span></span>;
}
