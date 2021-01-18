import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './SelectCategory.css';

export default function SelectCategory({
  currentPlayer,
  setCurrentCategory,
  categories,
}) {
  const [activeCategory, setActiveCategory] = useState({ name: '' });
  const history = useHistory();

  useEffect(() => {
    if (categories.length > 0) {
      randomizeCategory();
    }
  }, [categories]);

  const randomizeCategory = () => {
    let count = 0;
    let prevRandomIndex;
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
        setCurrentCategory(activeCategory);
        setTimeout(() => history.push('/question'), 2000);
      }
    }, 100);
  };

  return (
    <div className="text-center">
      <div className="mb-4">
        <div>It's your turn</div>
        <h1 className="mb-0">{currentPlayer.name}</h1>
        <div>"{currentPlayer.description}"</div>
      </div>
      <div className="row">
        {categories.map((item, idx) => (
          <div className="col-6" key={idx}>
            <div
              className={
                'category text-center' +
                (item.name === activeCategory?.name ? ' active' : '')
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
