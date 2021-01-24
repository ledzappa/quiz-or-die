import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Home() {
  const history = useHistory();
  return (
    <div className="text-center">
      <h1>Quizmageddon</h1>
      <p>
        Welcome to quizmageddon - the best quiz game ever created by men. Start
        the game by adding players!
      </p>
      <button
        className="btn btn-primary"
        onClick={() => history.push('/add-players')}
      >
        Add players
      </button>
      <button
        className="btn btn-outline-light"
        onClick={() => history.push('/add-question')}
      >
        Add question
      </button>
    </div>
  );
}
