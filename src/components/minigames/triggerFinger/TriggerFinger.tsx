import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Player } from '../../../interfaces/interfaces';
import './TriggerFinger.css';

export default function RoundAndRound({
  players,
  setPlayers,
  sounds
}: {
  players: Player[];
  setPlayers: any;
  sounds: any
}) {
  const [started, setStarted] = useState(false);
  const [triggerPlayers, setTriggerPlayers] = useState(
    players.map((player) => ({
      ...player,
      reactionTime: 0,
      isEliminated: false,
    }))
  );
  const [switched, setSwitched] = useState(false);
  const [isTriggered, setIsTriggered] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timer, setTimer] = useState<any>(null);
  const [switchTime, setSwitchTime] = useState<any>();
  const [switchDate, setSwitchDate] = useState<any>();
  const [soundCountDownInterval, setSoundCountDownInterval] = useState<any>();
  const [fastestTime, setFastestTime] = useState<number>(1000000);
  const history = useHistory();

  useEffect(() => {
    sounds.goodPerk();
    setStarted(false);
    resetState();
  }, []);

  useEffect(() => {
    if (started) {
      updateElapsedTime();
      if (elapsedTime > switchTime && !switched) {
        setSwitched(true);
        clearInterval(soundCountDownInterval);
        setSwitchDate(Date.now());
        clearTimeout(timer);
      }
    } else {
    }
  }, [elapsedTime, started, switched, switchTime]);

  const start = () => {
    sounds.btn();
    setStarted(true);
    setElapsedTime(1);
    startPlayingCountdownSound();
  };

  const updateElapsedTime = () => {
    setTimer(
      setTimeout(() => {
        setElapsedTime(elapsedTime + 10);
      }, 10)
    );
  };

  const startPlayingCountdownSound = () =>
    setSoundCountDownInterval(setInterval(() => sounds.countDown(), 750));

  const trigger = () => {
    clearInterval(soundCountDownInterval);
    setIsTriggered(true);
    let reactionTime = Date.now() - switchDate;
    reactionTime = Number.isNaN(reactionTime) ? -1 : reactionTime;
    const wasTooEarly = reactionTime === -1;
    const isFastest = reactionTime > 0 && reactionTime < fastestTime;
    if (isFastest) {
      sounds.trigger();
      setFastestTime(reactionTime);
    } else {
      sounds.tooEarly();
    }

    setTriggerPlayers(
      triggerPlayers.map((player: Player) =>
        player.isPlayersTurn
          ? { ...player, reactionTime, isEliminated: !isFastest || wasTooEarly }
          : {
              ...player,
              isEliminated:
                player.isEliminated ||
                (reactionTime !== -1 && player.reactionTime > reactionTime),
            }
      )
    );

    clearTimeout(timer);
  };

  const resetState = () => {
    const switchTime = Math.floor(Math.random() * 10 * 1000) + 4000;
    setSwitched(false);
    setSwitchTime(switchTime);
    setSwitchDate(undefined);
    setElapsedTime(1);
    setIsTriggered(false);
  };

  const nextTurn = () => {
    sounds.btn();

    const remainingPlayers: Player[] = triggerPlayers.filter(
      (player) => !player.isEliminated
    );

    const isWinner = remainingPlayers.length === 1;

    if (isWinner) {
      setPlayers(
        players.map((player) =>
          player.name === remainingPlayers[0].name
            ? {
                ...player,
                points: player.points + 2,
                isMiniGameWinner: true,
              }
            : player
        )
      );
      history.push('/scoreboard');
    } else {
      resetState();
      startPlayingCountdownSound();
      const currentTurnIndex = triggerPlayers.findIndex(
        (player: Player) => player.isPlayersTurn
      );
      const nextTurnIndex =
        currentTurnIndex === triggerPlayers.length - 1
          ? 0
          : currentTurnIndex + 1;

      setTriggerPlayers(
        triggerPlayers.map((player: Player, idx: number) => ({
          ...player,
          isPlayersTurn: nextTurnIndex === idx,
        }))
      );
    }
  };

  const currentPlayer = triggerPlayers.filter(
    (player) => player.isPlayersTurn
  )[0];

  return (
    <div>
      <div className="round-and-round animate__animated animate__rotateIn">
        <h1>Trigger finger!</h1>
        <p>
          Press the button as soon as it turns to green. The fastest player gets
          one point!
        </p>
        <button className="btn btn-secondary" onClick={() => start()}>
          Let's go!
        </button>
      </div>
      {started && (
        <div className="theme-wrapper">
          <h3>Trigger finger!</h3>
          {!isTriggered && <h4>Press the button when it turns red</h4>}
          <hr></hr>
          {isTriggered ? (
            <div>
              <h3>{currentPlayer.name} triggered in: </h3>
              <h1 onClick={() => console.log(triggerPlayers)}>
                {currentPlayer.reactionTime}ms
              </h1>
              <h1>
                {currentPlayer.reactionTime > 0
                  ? !currentPlayer.isEliminated
                    ? 'YOU ARE IN THE LEAD!'
                    : 'TOO SLOW :('
                  : 'TOO EARLY! :('}
              </h1>
              <button className="btn btn-primary" onClick={() => nextTurn()}>
                Next
              </button>
            </div>
          ) : (
            <button
              className={`btn btn-trigger w-100 btn-${
                switched ? 'danger' : 'primary'
              }`}
              onClick={trigger}
            >
              {switched
                ? 'TRIGGER!!!'
                : `Wait for it ${currentPlayer.name.toUpperCase()}...`}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
