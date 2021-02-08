import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDoubleUp, faSync } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import useSound from 'use-sound';
import './App.css';
import AddPlayers from './components/addPlayers/AddPlayers';
import Home from './components/home/Home';
import Perks from './components/perks/Perks';
import Question from './components/question/Question';
import RoundAndRound from './components/roundAndRound/RoundAndRound';
import Scoreboard from './components/scoreboard/Scoreboard';
import SelectCategory from './components/selectCategory/SelectCategory';
import ShowTurn from './components/showTurn/ShowTurn';
import ViewQuestions from './components/viewQuestions/ViewQuestions';
import sound from './sounds/robots.mp3';
import soundButton from './sounds/button.mp3';
import goodPerk from './sounds/goodPerk.mp3';
import Login from './components/login/Login';

library.add(faSync, faAngleDoubleUp);

function App() {
  const [players, setPlayers] = useState([]);
  const [questions, setQuestions] = useState({});
  const [categories, setCategories] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [themes, setThemes] = useState({});
  const [direction, setDirection] = useState(1);
  const [user, setUser] = useState({});
  const [play] = useSound(sound, { volume: 0.25 });
  const [playBtnSound] = useSound(soundButton, { volume: 0.25 });
  const [playGoodPerkSound] = useSound(goodPerk, { volume: 0.25 });

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
    <div className="App" onClick={(e) => console.log(e.target)}>
      <MemoryRouter>
        <Switch>
          <Route exact path="/">
            <Login setUser={(user) => setUser(user)}></Login>
          </Route>
          <Route path="/home">
            <Home
              user={user}
              setCategories={(categories) => setCategories(categories)}
              setQuestions={(questions) => setQuestions(questions)}
              setThemes={(themes) => setThemes(themes)}
            ></Home>
          </Route>
          <Route path="/add-players">
            <AddPlayers
              players={players}
              playBtnSound={playBtnSound}
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
              playGoodPerkSound={playGoodPerkSound}
              setPlayers={(players) => setPlayers(players)}
              setDirection={() => setDirection(direction * -1)}
            ></Perks>
          </Route>
          <Route path="/round-and-round">
            <RoundAndRound
              players={players}
              themes={themes}
              playGoodPerkSound={playGoodPerkSound}
              playBtnSound={playBtnSound}
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
                _setCurrentQuestion(category);
              }}
            ></SelectCategory>
          </Route>
          <Route path="/question">
            <Question
              currentPlayer={
                players.filter((player) => player.isPlayersTurn)[0]
              }
              currentQuestion={currentQuestion}
              players={players}
              playBtnSound={playBtnSound}
              setPlayers={(players) => setPlayers(players)}
            ></Question>
          </Route>
          <Route path="/scoreboard">
            <Scoreboard
              players={players}
              direction={direction}
              setPlayers={(players) => setPlayers(players)}
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
