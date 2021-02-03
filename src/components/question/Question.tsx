import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Question({ currentQuestion, updatePlayerPoints, playBtnSound } : any) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [timer, setTimer] = useState<any>();
  const history = useHistory();

  useEffect(() => {
    updateTime();
  }, [timeRemaining, showAnswer]);

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
    updatePlayerPoints();
    playBtnSound();
    history.push('/scoreboard');
  };

  const wrongAnswer = () => {
    playBtnSound();
    history.push('/scoreboard');
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-capitalize">{currentQuestion.category}</h1>
        <p>{currentQuestion.question}</p>
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
                className="btn btn-success w-100 p-3"
                onClick={() => rightAnswer()}
              >
                YES
              </button>
            </div>
            <div className="col-6">
              <button
                className="btn btn-danger w-100 p-3"
                onClick={() => wrongAnswer()}
              >
                NO
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
