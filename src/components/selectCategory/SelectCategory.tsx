import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Category, Player } from '../../interfaces/interfaces';
import './SelectCategory.css';

export default function SelectCategory({
  currentPlayer,
  setCurrentCategory,
  categories,
  sounds
}: {
  currentPlayer: Player;
  setCurrentCategory: any;
  setCurrentQuestion: any;
  categories: Category[];
  sounds: any;
}) {
  const [activeCategory, setActiveCategory] = useState({
    id: 0,
    identifier: '',
    name: '',
  });
  const history = useHistory();

  useEffect(() => {
    randomizeCategory();
  }, []);

  const randomizeCategory = () => {
    if (currentPlayer.perks.freedomOfChoice > 0) return;
    let count = 0;
    let prevRandomIndex: any;
    const interval = setInterval(() => {
      let randomIndex = Math.floor(Math.random() * categories.length);
      while (randomIndex === prevRandomIndex) {
        randomIndex = Math.floor(Math.random() * categories.length);
      }
      setActiveCategory(categories[randomIndex]);
      prevRandomIndex = randomIndex;
      count++;
      if (count === 15) {
        clearInterval(interval);
        setCurrentCategory(categories[randomIndex]);
        setTimeout(() => history.push('/question'), 2000);
      }
      sounds.click();
    }, 200);
  };

  const handleClick = (category: Category) => {
    if (currentPlayer.perks.freedomOfChoice > 0) {
      setCurrentCategory(category);
      history.push('/question');
    }
  };

  return (
    <div className="text-center">
      <div className="mb-4">
        <h1 className="mb-0 text-uppercase">{currentPlayer.name}</h1>
        <div>"{currentPlayer.description}"</div>
        <div>({currentPlayer.points} points)</div>
        {currentPlayer.perks.freedomOfChoice > 0 && (
          <div>
            Freedom Of Choice left: {currentPlayer.perks.freedomOfChoice}
          </div>
        )}
      </div>
      <div className="row">
        {categories.map((item: Category, idx: number) => (
          <div className="col-12 col-sm-6 p-1" key={idx}>
            <div
              onClick={() => handleClick(item)}
              className={
                'category text-center p-sm-3 ' +
                item.identifier +
                (item.name === activeCategory?.name ||
                currentPlayer.perks.freedomOfChoice > 0
                  ? ' active'
                  : '')
              }
            >
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
