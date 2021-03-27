import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faAngleDoubleUp,
  faArrowRight,
  faBomb,
  faCheck,
  faCog,
  faHandSparkles,
  faPlay,
  faPlus,
  faSync,
  faTimes,
  faTools,
  faTrophy,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import useSound from 'use-sound';
import './App.scss';
import AddPlayers from './components/addPlayers/AddPlayers';
import Home from './components/home/Home';
import Login from './components/login/Login';
import RoundAndRound from './components/minigames/roundAndRound/RoundAndRound';
import TriggerFinger from './components/minigames/triggerFinger/TriggerFinger';
import Perks from './components/perks/Perks';
import Question from './components/question/Question';
import Scoreboard from './components/scoreboard/Scoreboard';
import SelectCategory from './components/selectCategory/SelectCategory';
import ShowTurn from './components/showTurn/ShowTurn';
import ViewQuestions from './components/viewQuestions/ViewQuestions';
import soundButton from './sounds/button.mp3';
import goodPerk from './sounds/goodPerk.mp3';
import sound from './sounds/robots.mp3';
import countdown from './sounds/countdown2.mp3';
import trigger from './sounds/trigger.mp3';
import tooearly from './sounds/tooearly.mp3';

library.add(
  faSync,
  faAngleDoubleUp,
  faCog,
  faTrophy,
  faHandSparkles,
  faBomb,
  faPlus,
  faCheck,
  faTimes,
  faArrowRight,
  faPlay,
  faTools
);

function App() {
  const [players, setPlayers] = useState([]);
  const [settings, setSettings] = useState({
    pointsToWin: 10,
    enabledMiniGames: ['roundAndRound', 'triggerFinger', 'closestWins'],
    probMiniGame: 0.1,
    probPerk: 0.2,
    probPlayerPerk: 0.6,
    lightMode: false,
    imgBaseUrl: 'https://quizmageddon.s3.eu-north-1.amazonaws.com/',
  });
  const soundConfig = { volume: 1 };
  const [questions, setQuestions] = useState({});
  const [categories, setCategories] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [themes, setThemes] = useState({});
  const [direction, setDirection] = useState(1);
  const [user, setUser] = useState({});
  const [isMiniGame, setIsMiniGame] = useState(false);
  const [play] = useSound(sound, soundConfig);
  const [playBtnSound] = useSound(soundButton, soundConfig);
  const [playGoodPerkSound] = useSound(goodPerk, soundConfig);
  const [playTriggerSound] = useSound(trigger, soundConfig);
  const [playCountdownSound] = useSound(countdown, { volume: 0.5 });
  const [playTooEarlySound] = useSound(tooearly, soundConfig);

  useEffect(() => {
    settings.lightMode
      ? document.body.classList.add('light-mode')
      : document.body.classList.remove('light-mode');
  }, [settings]);

  const _setCurrentQuestion = (category) => {
    const questionsByCategory = questions.filter(
      (question) => question.categoryId === category.id
    );
    const numOfQuestionsInCategory = questionsByCategory.length;
    const randomIndex = Math.floor(Math.random() * numOfQuestionsInCategory);
    const randomQuestion = questionsByCategory[randomIndex];
    setQuestions(
      questions.filter((question) => question.id !== randomQuestion.id)
    );
    setCurrentQuestion({ ...randomQuestion, category: category.identifier });
  };

  return (
    <div className="App">
      <MemoryRouter>
        <Switch>
          <Route exact path="/">
            <Login setUser={setUser}></Login>
          </Route>
          <Route path="/home">
            <Home
              categories={categories}
              user={user}
              settings={settings}
              setSettings={setSettings}
              setCategories={setCategories}
              setQuestions={setQuestions}
              setThemes={setThemes}
            ></Home>
          </Route>
          <Route path="/add-players">
            <AddPlayers
              players={players}
              playBtnSound={playBtnSound}
              setPlayers={setPlayers}
            ></AddPlayers>
          </Route>
          <Route path="/show-turn">
            <ShowTurn
              settings={settings}
              currentPlayer={
                players.filter((player) => player.isPlayersTurn)[0]
              }
            ></ShowTurn>
          </Route>
          <Route path="/perks">
            <Perks
              settings={settings}
              players={players}
              playGoodPerkSound={playGoodPerkSound}
              setPlayers={setPlayers}
              setDirection={() => setDirection(direction * -1)}
            ></Perks>
          </Route>
          <Route path="/round-and-round">
            <RoundAndRound
              players={players}
              themes={themes}
              playGoodPerkSound={playGoodPerkSound}
              playBtnSound={playBtnSound}
              setPlayers={setPlayers}
            ></RoundAndRound>
          </Route>
          <Route path="/trigger-finger">
            <TriggerFinger
              players={players}
              playGoodPerkSound={playGoodPerkSound}
              playTriggerSound={playTriggerSound}
              playCountdownSound={playCountdownSound}
              playTooEarlySound={playTooEarlySound}
              playBtnSound={playBtnSound}
              setPlayers={setPlayers}
            ></TriggerFinger>
          </Route>
          <Route path="/select-category">
            <SelectCategory
              currentPlayer={
                players.filter((player) => player.isPlayersTurn)[0]
              }
              categories={categories.filter((category) => !category.disabled)}
              play={play}
              setCurrentCategory={_setCurrentQuestion}
            ></SelectCategory>
          </Route>
          <Route path="/question">
            <Question
              currentPlayer={
                players.filter((player) => player.isPlayersTurn)[0]
              }
              currentQuestion={currentQuestion}
              players={players}
              settings={settings}
              playBtnSound={playBtnSound}
              setPlayers={setPlayers}
            ></Question>
          </Route>
          <Route path="/scoreboard">
            <Scoreboard
              settings={settings}
              direction={direction}
              players={players}
              setPlayers={setPlayers}
              isMiniGame={isMiniGame}
              setIsMiniGame={setIsMiniGame}
              playGoodPerkSound={playGoodPerkSound}
            ></Scoreboard>
          </Route>
          <Route path="/admin/questions">
            <ViewQuestions categories={categories}></ViewQuestions>
          </Route>
        </Switch>
      </MemoryRouter>
    </div>
  );
}

export default App;
