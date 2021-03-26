import React, { useEffect, useState } from 'react';
import api from '../../api/Api';
import { useHistory } from 'react-router-dom';
import Settings from '../settings/Settings';
import { Question } from '../../interfaces/interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Home.css';

export default function Home({
  categories,
  settings,
  setCategories,
  setQuestions,
  setThemes,
  setSettings,
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
              <FontAwesomeIcon className="mr-2" icon="tools" />
              Admin
            </button>
          )}
        </div>
      </div>
      <div className="text-center">
        <h1>Quizmageddon</h1>
        <p className="mb-5">
          Welcome to quizmageddon - the best quiz game ever created by men.
          Start the game by adding players!
        </p>
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <div className="button-container d-inline-block">
              <button
                className="btn btn-primary play-quizmageddon mb-3 w-100 p-3"
                onClick={() => history.push('/add-players')}
              >
                <FontAwesomeIcon className="mr-2" icon="play" />
                Play Quizmageddon
              </button>
              <button
                className="btn btn-outline-light w-100 p-3"
                onClick={handleSettingsClick}
              >
                <FontAwesomeIcon className="mr-2" icon="cog" />
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>
      <Settings
        categories={categories}
        setCategories={setCategories}
        showModal={showSeetingsModal}
        settings={settings}
        setSettings={setSettings}
        setShowModal={setShowSettingsModal}
      ></Settings>
    </div>
  );
}
