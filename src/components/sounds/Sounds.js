import React, { useEffect } from 'react';
import useSound from 'use-sound';
import goodPerk from '../../sounds/goodPerk.mp3';
import button from '../../sounds/button.mp3';
import click from '../../sounds/robots.mp3';
import countdown from '../../sounds/countdown2.mp3';
import trigger from '../../sounds/trigger.mp3';
import tooearly from '../../sounds/tooearly.mp3';

export default function Sounds({ sounds, setSounds }) {
  const soundConfig = { volume: 1 };
  const [playBtnSound] = useSound(button, soundConfig);
  const [playGoodPerkSound] = useSound(goodPerk, soundConfig);
  const [playTriggerSound] = useSound(trigger, soundConfig);
  const [playCountdownSound] = useSound(countdown, soundConfig);
  const [playTooEarlySound] = useSound(tooearly, soundConfig);
  const [playClickSound] = useSound(click, soundConfig);

  useEffect(() => {
    if (!sounds) {
      setSounds(() => ({
        btn: () => playBtnSound(),
        goodPerk: () => playGoodPerkSound(),
        trigger: () => playTriggerSound(),
        countdown: () => playCountdownSound(),
        tooEarly: () => playTooEarlySound(),
        click: () => playClickSound(),
      }));
    }
  }, [
    playBtnSound,
    playGoodPerkSound,
    playTriggerSound,
    playCountdownSound,
    playTooEarlySound,
    playClickSound,
    setSounds,
    sounds,
  ]);

  return <span></span>;
}
