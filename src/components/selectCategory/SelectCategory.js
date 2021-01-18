import React, { useState, useEffect } from 'react';
import './SelectCategory.css';

export default function SelectCategory({ categories }) {
  const [activeCategory, setActiveCategory] = useState({ name: '' });

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
      if (count === 10) {
        clearInterval(interval);
      }
    }, 200);
  };

  return (
    <div>
      <h1>Mikael</h1>
      <div>The fantastic eagle</div>
      <p>It's your turn!</p>
      {categories.map((item, idx) => (
        <div
          key={idx}
          className={
            item.name === activeCategory?.name ? 'category active' : 'category'
          }
        >
          {item.name}
        </div>
      ))}
    </div>
  );
}
