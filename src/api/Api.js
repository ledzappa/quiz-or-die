import axios from 'axios';
const mocks = true;

const api = {
  getCategories: () =>
    axios.get(mocks ? 'mocks/categories.json' : '/api/categories'),
  getPlayerDescriptionWords: () =>
    axios.get(
      mocks
        ? 'mocks/playerDescriptionWords.json'
        : '/api/playerDescriptionWords'
    ),
  getQuestions: () =>
    axios.get(mocks ? 'mocks/questions.json' : '/api/questions'),
};

export default api;
