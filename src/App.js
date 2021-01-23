import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDoubleUp, faSync } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import useSound from 'use-sound';
import api from './api/Api';
import './App.css';
import AddPlayers from './components/addPlayers/AddPlayers';
import Home from './components/home/Home';
import Perks from './components/perks/Perks';
import Question from './components/question/Question';
import RoundAndRound from './components/roundAndRound/RoundAndRound';
import Scoreboard from './components/scoreboard/Scoreboard';
import SelectCategory from './components/selectCategory/SelectCategory';
import ShowTurn from './components/showTurn/ShowTurn';
import sound from './sounds/robots.mp3';

library.add(faSync, faAngleDoubleUp);

function App() {
  const [players, setPlayers] = useState([]);
  const [questions, setQuestions] = useState({});
  const [categories, setCategories] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [themes, setThemes] = useState({});
  const [direction, setDirection] = useState(1);
  const [play] = useSound(sound, { volume: 0.25 });

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

  const _setCurrentQuestion = (category) => {
    const numOfQuestionsInCategory = questions[category].length;
    const randomIndex = Math.floor(Math.random() * numOfQuestionsInCategory);
    const randomQuestion = questions[category][randomIndex];
    setCurrentQuestion({ ...randomQuestion, category });
  };

  const updatePlayerPoints = () => {
    setPlayers(
      players.map((player) =>
        player.isPlayersTurn
          ? {
              ...player,
              points: player.points + (player.perks.doubleUp > 0 ? 2 : 1),
            }
          : player
      )
    );
  };

  return (
    <div className="App">
      <MemoryRouter>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/add-players">
            <AddPlayers
              players={players}
              setPlayers={(players) => setPlayers(players)}
            ></AddPlayers>
          </Route>
          <Route path="/show-turn">
            <ShowTurn
              currentPlayer={
                players.filter((player) => player.isPlayersTurn)[0]
              }
            ></ShowTurn>
          </Route>
          <Route path="/perks">
            <Perks
              players={players}
              setDirection={() => setDirection(direction * -1)}
              setPlayers={(players) => setPlayers(players)}
            ></Perks>
          </Route>
          <Route path="/round-and-round">
            <RoundAndRound
              players={players}
              themes={themes}
              setPlayers={(players) => setPlayers(players)}
            ></RoundAndRound>
          </Route>
          <Route path="/select-category">
            <SelectCategory
              currentPlayer={
                players.filter((player) => player.isPlayersTurn)[0]
              }
              categories={categories}
              play={play}
              setCurrentCategory={(category) => {
                _setCurrentQuestion('movies');
              }}
            ></SelectCategory>
          </Route>
          <Route path="/question">
            <Question
              currentPlayer={
                players.filter((player) => player.isPlayersTurn)[0]
              }
              currentQuestion={currentQuestion}
              updatePlayerPoints={() => updatePlayerPoints()}
            ></Question>
          </Route>
          <Route path="/scoreboard">
            <Scoreboard
              players={players}
              setPlayers={(players) => setPlayers(players)}
              direction={direction}
            ></Scoreboard>
          </Route>
        </Switch>
      </MemoryRouter>
    </div>
  );
}

export default App;
