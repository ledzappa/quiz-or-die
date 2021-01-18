import { useState, useEffect } from 'react';
import SelectCategory from './components/selectCategory/SelectCategory';
import './App.css';
import api from './api/Api';
import AddPlayers from './components/addPlayers/AddPlayers';

function App() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    api.getCategories().then((res) => {
      setCategories(res.data.categories);
    });
  }, []);

  return (
    <div className="App">
      <AddPlayers></AddPlayers>
      <SelectCategory categories={categories}></SelectCategory>
    </div>
  );
}

export default App;
