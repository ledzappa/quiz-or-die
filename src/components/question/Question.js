import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Question({
  currentPlayer,
  currentQuestion,
  updatePlayerPoints,
}) {
  const [showAnswer, setShowAnswer] = useState(false);
  const history = useHistory();

  const rightAnswer = () => {
    updatePlayerPoints();
    history.push('/scoreboard');
  };

  const wrongAnswer = () => {};

  return (
    <div>
      <h1>{currentPlayer.name}</h1>
      <p>{currentQuestion.question}</p>
      {showAnswer ? (
        <div>
          <div className="font-weight-bold">Answer:</div>
          <p>{currentQuestion.answer}</p>
          <hr />
          <div className="mb-2">Did you get it?</div>
          <div className="row">
            <div className="col-6">
              <button
                className="btn btn-success w-100"
                onClick={() => rightAnswer()}
              >
                Yes! :D
              </button>
            </div>
            <div className="col-6">
              <button
                className="btn btn-danger w-100"
                onClick={() => wrongAnswer()}
              >
                No! :(
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          className="btn btn-secondary"
          onClick={() => setShowAnswer(true)}
        >
          Show answer
        </button>
      )}
    </div>
  );
}
