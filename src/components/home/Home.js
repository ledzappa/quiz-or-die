import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Home() {
  const history = useHistory();
  return (
    <div>
      <h1>Quizmageddon</h1>
      <p className="animate__animated animate__zoomInDown">Welcome to quizmageddon. Go ahead and add some players.</p>
      <button
        className="btn btn-primary"
        onClick={() => history.push('/add-players')}
      >
        Add players
      </button>
    </div>
  );
}
