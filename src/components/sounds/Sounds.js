import React, { useEffect } from 'react';
import useSound from 'use-sound';
import soundButton from '../../sounds/button.mp3';
import goodPerk from '../../sounds/goodPerk.mp3';
import sound from '../../sounds/robots.mp3';

export default function Sounds({ sounds, setSounds }) {
  const [play] = useSound(sound, { volume: 0.25 });
  const [playBtnSound] = useSound(soundButton, { volume: 0.25 });
  const [playGoodPerkSound] = useSound(goodPerk, { volume: 0.25 });

  useEffect(() => {
    console.log(play);
    if (!sounds) {
      console.log('setSounds');
      setSounds({ play: () => play, playBtnSound, playGoodPerkSound });
    }
  }, []);

  const handlePlayClick = () => {
    sounds.play();
  }

  return (
    <div>
      <button onClick={handlePlayClick}>Sounds</button>
    </div>
  );
}
