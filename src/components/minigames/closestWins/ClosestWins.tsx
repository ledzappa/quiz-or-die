import { ENGINE_METHOD_PKEY_ASN1_METHS } from 'node:constants';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Player } from '../../../interfaces/interfaces';
import './ClosestWins.css';

export default function ClosestWins({
  questions,
  setClosestWinsQuestions,
  players,
  setPlayers,
  sounds,
}: {
  questions: any[];
  players: Player[];
  setPlayers: any;
  sounds: any;
  setClosestWinsQuestions: Function;
}) {
  const [started, setStarted] = useState(false);
  const [question, setQuestion] = useState({
    question: 'What year was Michael Jackson born?',
    answer: 1960,
    answerText: 'He was born in 1960',
  });
  const [closestWinGuess, setClosesWinGuess] = useState('');
  const [showError, setShowError] = useState(false);
  const [cwPlayers, setCwPlayers] = useState(
    players.map((players) => ({ ...players, closestWinGuess: null }))
  );
  const history = useHistory();

  useEffect(() => {
    sounds.miniGame();
    const randomIdx = Math.floor(Math.random() * questions.length);
    setQuestion(questions[randomIdx]);
    setClosestWinsQuestions(questions.filter((item, idx) => idx !== randomIdx));
  }, []);

  useEffect(() => {
    if (cwPlayers.filter((player) => player.isMiniGameWinner).length > 0)
      return;
    const playersThatHaveGuessed = cwPlayers.filter(
      (player) => !!player.closestWinGuess
    );
    if (playersThatHaveGuessed.length === cwPlayers.length) {
      showClosestGuess();
    }
  }, [cwPlayers]);

  const start = () => {
    setStarted(true);
  };

  const next = () => {
    sounds.btn();
    history.push('/scoreboard');
  };

  const reset = () => {
    setStarted(false);
    setCwPlayers(
      players.map((players) => ({ ...players, closestWinGuess: null }))
    );
  };

  const showClosestGuess = () => {
    let leastDiff: number;
    let leastDiffIdx: any = null;

    cwPlayers.forEach((player: any, idx) => {
      const playerDiff = Math.abs(player.closestWinGuess - question.answer);
      if (!leastDiff || playerDiff < leastDiff) {
        leastDiff = playerDiff;
        leastDiffIdx = idx;
      }
    });

    setCwPlayers(
      cwPlayers.map((player, idx) =>
        idx === leastDiffIdx ? { ...player, isMiniGameWinner: true } : player
      )
    );

    setPlayers(
      players.map((player, idx) =>
        idx === leastDiffIdx
          ? { ...player, points: player.points + 2, isMiniGameWinner: true }
          : player
      )
    );
  };

  const handleNumberChange = (btn: string) => {
    sounds.btn();
    const val =
      btn !== 'delete'
        ? closestWinGuess + btn
        : closestWinGuess.substr(0, closestWinGuess.length - 1);
    setClosesWinGuess(val);
  };

  const handleSubmit = () => {
    sounds.btn();
    setShowError(false);
    const currentTurnIndex = cwPlayers.findIndex(
      (player: Player) => player.isPlayersTurn
    );
    const nextTurnIndex =
      currentTurnIndex === cwPlayers.length - 1 ? 0 : currentTurnIndex + 1;
    const guessExists =
      cwPlayers.filter(
        (player) => player.closestWinGuess === Number(closestWinGuess)
      ).length > 0;

    if (guessExists) {
      setShowError(true);
      setClosesWinGuess('');
      return;
    }

    setCwPlayers(
      cwPlayers.map((player: any, idx: number) => ({
        ...player,
        closestWinGuess: player.isPlayersTurn
          ? Number(closestWinGuess)
          : player.closestWinGuess,
        isPlayersTurn: nextTurnIndex === idx,
      }))
    );

    setClosesWinGuess('');
  };

  const currentPlayer = cwPlayers.filter((player) => player.isPlayersTurn)[0];
  const winner = cwPlayers.filter((player) => player.isMiniGameWinner)[0];
  const btns = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'delete'];

  return (
    <div>
      {started ? (
        !winner ? (
          <div>
            <h3 className="question mb-3">{question.question}</h3>
            <div className="cw-display text-center">
              {closestWinGuess.length === 0 ? (
                <h3 className="name">{currentPlayer.name}</h3>
              ) : (
                <h3 className="number">
                  {closestWinGuess.split('').map((number) => '*')}
                </h3>
              )}
            </div>

            <div className="row">
              {btns.map((btn, idx) => (
                <div className="col-4" key={idx}>
                  <div
                    className="cw-btn"
                    onClick={() => handleNumberChange(btn)}
                  >
                    {btn}
                  </div>
                </div>
              ))}
            </div>

            {showError && (
              <h4 className="animate__animated animate__flash">
                Sorry! That guess is already taken! :(
              </h4>
            )}
            <hr />
            <button
              className="btn btn-success submit-btn"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="mb-4">{winner.name} wins!</h2>
            <h4 onClick={reset}>The correct answer is:</h4>
            <div className="mb-5">
              <h1 className="answer">{question.answer}</h1>
              {question.answerText && <div>{question.answerText}</div>}
            </div>
            <h4>Your guesses:</h4>
            {cwPlayers.map((player, idx) => (
              <div className="text-center" key={idx}>
                {player.name}: {player.closestWinGuess}
              </div>
            ))}
            <hr></hr>
            <button className="btn btn-outline-light" onClick={next}>
              Continue
            </button>
          </div>
        )
      ) : (
        <div className="minigame animate__animated animate__rotateIn">
          <h1 className="text-center">Mini Game!</h1>
          <h5 className="text-center mb-4">
            Guess a number! The one who is closest wins 2 points.
          </h5>
          <div className="example">
            <b className="d-block">Example question:</b> What year was Michael
            Jackson born?
          </div>
          <button className="btn btn-outline-light w-100" onClick={start}>
            Alright, let's go!
          </button>
        </div>
      )}
    </div>
  );
}
