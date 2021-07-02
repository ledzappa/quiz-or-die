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
import Sounds from './components/sounds/Sounds';
import ClosestWins from './components/minigames/closestWins/ClosestWins';

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

  const [questions, setQuestions] = useState({});
  const [categories, setCategories] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [themes, setThemes] = useState({});
  const [closestWinsQuestions, setClosestWinsQuestions] = useState([]);
  const [sounds, setSounds] = useState({});
  const [direction, setDirection] = useState(1);
  const [user, setUser] = useState({});
  const [isMiniGame, setIsMiniGame] = useState(false);

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
      <Sounds setSounds={setSounds} />
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
              setClosestWinsQuestions={setClosestWinsQuestions}
              sounds={sounds}
            ></Home>
          </Route>
          <Route path="/add-players">
            <AddPlayers
              players={players}
              setPlayers={setPlayers}
              sounds={sounds}
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
              setPlayers={setPlayers}
              setDirection={() => setDirection(direction * -1)}
              sounds={sounds}
            ></Perks>
          </Route>
          <Route path="/round-and-round">
            <RoundAndRound
              players={players}
              themes={themes}
              setThemes={setThemes}
              setPlayers={setPlayers}
              sounds={sounds}
            ></RoundAndRound>
          </Route>
          <Route path="/trigger-finger">
            <TriggerFinger
              players={players}
              setPlayers={setPlayers}
              sounds={sounds}
            ></TriggerFinger>
          </Route>
          <Route path="/closest-wins">
            <ClosestWins
              questions={closestWinsQuestions}
              setClosestWinsQuestions={setClosestWinsQuestions}
              players={players}
              setPlayers={setPlayers}
              sounds={sounds}
            ></ClosestWins>
          </Route>
          <Route path="/select-category">
            <SelectCategory
              currentPlayer={
                players.filter((player) => player.isPlayersTurn)[0]
              }
              categories={categories.filter((category) => !category.disabled)}
              setCurrentCategory={_setCurrentQuestion}
              sounds={sounds}
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
              setPlayers={setPlayers}
              sounds={sounds}
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
              sounds={sounds}
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
