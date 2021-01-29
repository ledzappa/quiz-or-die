import axios from 'axios';
const mocks = false;

const api = {
  getCategories: () =>
    axios.get(mocks ? 'mocks/categories.json' : '/api/categories'),
  getPlayerDescriptionWords: () =>
    axios.get('mocks/playerDescriptionWords.json'),
  getQuestions: () =>
    axios.get(mocks ? 'mocks/questions.json' : '/api/questions'),
  getAllQuestions: () =>
    axios.get(mocks ? 'mocks/questions.json' : '/api/all-questions'),
  getRoundAndRoundThemes: () =>
    axios.get(mocks ? 'mocks/roundAndRound.json' : '/api/round-and-round'),
  addQuestion: (formData) => axios.post('/api/questions', formData),
};

export default api;
