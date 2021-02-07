import React, { useEffect } from 'react';
import api from '../../api/Api';
import { useHistory } from 'react-router-dom';

export default function Home({
  setCategories,
  setQuestions,
  setThemes,
  user,
}: any) {
  const history = useHistory();

  useEffect(() => {
    api.getCategories().then((res) => {
      setCategories(res.data.categories);
    });

    api.getQuestions().then((res) => {
      setQuestions(res.data.questions);
    });

    api.getRoundAndRoundThemes().then((res) => {
      setThemes(res.data.themes);
    });
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-12 text-right">
          {user.roleId === 0 && (
            <button
              className="btn btn-outline-light"
              onClick={() => history.push('/admin/questions')}
            >
              Admin
            </button>
          )}
        </div>
      </div>
      <div className="text-center">
        <h1>Quizmageddon</h1>
        <p>
          Welcome to quizmageddon - the best quiz game ever created by men.
          Start the game by adding players!
        </p>
        <button
          className="btn btn-primary"
          onClick={() => history.push('/add-players')}
        >
          Add players
        </button>
      </div>
    </div>
  );
}
