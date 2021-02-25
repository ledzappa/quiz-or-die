import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Player, Question as _Question } from '../../interfaces/interfaces';
import './Question.css';

export default function Question({
  currentQuestion,
  currentPlayer,
  players,
  setPlayers,
  playBtnSound,
}: {
  currentQuestion: _Question;
  currentPlayer: Player;
  players: Player[];
  setPlayers: any;
  playBtnSound: any;
}) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [timer, setTimer] = useState<any>();
  const history = useHistory();

  useEffect(() => {
    updateTime();
  }, [timeRemaining, showAnswer]);

  const extractAlternatives = (question: string) => {
    if (question.includes('#ALT#')) {
      const questions = question.replace('#ALTEND#', '').split('#ALT#');
      const alternatives = questions[1].split(';;');
      const last = alternatives.pop();
      const alternativesText = `${alternatives.join(', ')} or ${last}?`;
      return questions[0] + alternativesText;
    } else {
      return question;
    }
  };

  const updateTime = () => {
    if (!showAnswer) {
      setTimer(
        setTimeout(() => {
          if (timeRemaining > 0) {
            setTimeRemaining(timeRemaining - 1);
          } else {
            handleTimeout();
            clearTimeout(timer);
          }
        }, 1000)
      );
    } else {
      clearTimeout(timer);
    }
  };

  const handleShowAnswerClick = () => {
    setShowAnswer(true);
    playBtnSound();
  };

  const handleTimeout = () => {
    setTimeout(() => history.push('/scoreboard'), 2000);
  };

  const rightAnswer = () => {
    const earnedPoints = currentPlayer.perks.doubleUp > 0 ? 2 : 1;
    const _players = updateCurrentPlayerPoints(players, earnedPoints);
    setPlayers(_players);
    playBtnSound();
    history.push('/scoreboard');
  };

  const wrongAnswer = () => {
    if (currentPlayer.perks.landmine > 0) {
      const _players = updateCurrentPlayerPoints(players, -1);
      setPlayers(_players);
    }
    playBtnSound();
    history.push('/scoreboard');
  };

  const updateCurrentPlayerPoints = (players: Player[], points: number) => {
    return players.map((player) => {
      return player.isPlayersTurn
        ? {
            ...player,
            points: Math.max(0, player.points + points),
          }
        : player;
    });
  };

  return (
    <div>
      <div className="mb-4">
        <div className="text-uppercase">{currentPlayer.name}</div>
        <h1 className="text-capitalize">{currentQuestion.category}</h1>
        <p>{extractAlternatives(currentQuestion.question)}</p>
        {currentQuestion.img && <div className="text-center">
          <img src={currentQuestion.img} />
        </div>}
      </div>
      {showAnswer ? (
        <div>
          <div className="font-weight-bold">Answer:</div>
          <p>{currentQuestion.answer}</p>
          <hr />
          <div className="mb-3">Did you get it?</div>
          <div className="row">
            <div className="col-6">
              <button
                className="btn btn-success w-100 p-3 font-weight-bold yes-button"
                onClick={() => rightAnswer()}
              >
                <FontAwesomeIcon icon="check" />
                &nbsp;&nbsp;Yes
              </button>
            </div>
            <div className="col-6">
              <button
                className="btn btn-danger w-100 p-3 font-weight-bold no-button"
                onClick={() => wrongAnswer()}
              >
                <FontAwesomeIcon icon="times" />
                &nbsp;&nbsp;No
              </button>
            </div>
          </div>
        </div>
      ) : timeRemaining > 0 ? (
        <div className="text-center">
          <h1 className="mb-4">{timeRemaining}</h1>
          <button
            className="btn btn-secondary w-100 p-3"
            onClick={() => handleShowAnswerClick()}
          >
            Show answer
          </button>
        </div>
      ) : (
        'Whops! You ran out of time!'
      )}
    </div>
  );
}
