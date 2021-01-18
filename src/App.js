import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import api from './api/Api';
import './App.css';
import AddPlayers from './components/addPlayers/AddPlayers';
import Home from './components/home/Home';
import Question from './components/question/Question';
import Scoreboard from './components/scoreboard/Scoreboard';
import SelectCategory from './components/selectCategory/SelectCategory';

function App() {
  const [players, setPlayers] = useState([]);
  const [questions, setQuestions] = useState({});
  const [categories, setCategories] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState({});
  const [currentCategory, setCurrentCategory] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState({});

  useEffect(() => {
    api.getCategories().then((res) => {
      setCategories(res.data.categories);
    });

    api.getQuestions().then((res) => {
      setQuestions(res.data.questions);
    });
  }, []);

  const _setCurrentQuestion = (category) => {
    const numOfQuestionsInCategory = questions[category].length;
    const randomIndex = Math.floor(Math.random() * numOfQuestionsInCategory);
    const randomQuestion = questions[category][randomIndex];
    setCurrentQuestion(randomQuestion);
  };

  const updatePlayerPoints = () => {
    setPlayers(
      players.map((player) =>
        player.name === currentPlayer.name
          ? { ...player, points: player.points + 1 }
          : player
      )
    );
  };

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/add-players">
            <AddPlayers
              players={players}
              setPlayers={(players) => setPlayers(players)}
              setCurrentPlayer={(player) => setCurrentPlayer(player)}
            ></AddPlayers>
          </Route>
          <Route path="/select-category">
            <SelectCategory
              currentPlayer={currentPlayer}
              categories={categories}
              setCurrentCategory={(category) => {
                _setCurrentQuestion('movies');
              }}
            ></SelectCategory>
          </Route>
          <Route path="/question">
            <Question
              currentPlayer={currentPlayer}
              currentQuestion={currentQuestion}
              currentCategory={currentCategory}
              updatePlayerPoints={() => updatePlayerPoints()}
            ></Question>
          </Route>
          <Route path="/scoreboard">
            <Scoreboard
              players={players}
              currentPlayer={currentPlayer}
              setCurrentPlayer={(player) => setCurrentPlayer(player)}
            ></Scoreboard>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
