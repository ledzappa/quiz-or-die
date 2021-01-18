import axios from 'axios';
const mocks = true;

const api = {
  getCategories: () =>
    axios.get(mocks ? 'mocks/categories.json' : '/api/categories'),
  getPlayerDescriptionWords: () =>
    axios.get(mocks ? 'mocks/playerDescriptionWords.json' : '/api/playerDescriptionWords'),
};

export default api;
