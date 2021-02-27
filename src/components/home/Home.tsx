import React, { useEffect, useState } from 'react';
import api from '../../api/Api';
import { useHistory } from 'react-router-dom';
import Settings from '../settings/Settings';
import { Question } from '../../interfaces/interfaces';

export default function Home({
  categories,
  settings,
  setCategories,
  setQuestions,
  setThemes,
  user,
}: any) {
  const history = useHistory();
  const [showSeetingsModal, setShowSettingsModal] = useState(false);

  useEffect(() => {
    api.getCategories().then((res) => {
      setCategories(res.data.categories);
    });

    api.getQuestions().then((res) => {
      const questions = res.data.questions.map((question: Question) => ({
        ...question,
        img: question.img ? settings.imgBaseUrl + question.img : null,
      }));

      const images = questions
        .filter((question: Question) => !!question.img)
        .map((question: Question) => question.img);

      cacheImages(images);
      setQuestions(questions);
    });

    api.getRoundAndRoundThemes().then((res) => {
      setThemes(res.data.themes);
    });
  }, []);

  const cacheImages = (images: string[]) => {
    images.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  };

  const handleSettingsClick = () => {
    setShowSettingsModal(true);
  };

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
          className="btn btn-primary play-quizmageddon"
          onClick={() => history.push('/add-players')}
        >
          Play Quizmageddon
        </button>
        <button className="btn btn-outline-light" onClick={handleSettingsClick}>
          Settings
        </button>
      </div>
      <Settings
        categories={categories}
        setCategories={setCategories}
        showModal={showSeetingsModal}
        setShowModal={setShowSettingsModal}
      ></Settings>
    </div>
  );
}
