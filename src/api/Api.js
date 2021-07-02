import axios from 'axios';

const mocks = true;

const api = {
  getCategories: () =>
    axios.get(mocks ? 'mocks/categories.json' : '/api/categories'),
  getPlayerDescriptionWords: () =>
    axios.get('mocks/playerDescriptionWords.json'),
  getQuestions: () =>
    axios.get(mocks ? 'mocks/questions.json' : '/api/questions', {
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
    }),
  getAllQuestions: () =>
    axios.get(mocks ? 'mocks/questions.json' : '/api/all-questions', {
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
    }),
  getRoundAndRoundThemes: () =>
    axios.get(true ? 'mocks/roundAndRound.json' : '/api/round-and-round'),
  getClosestWinsQuestions: () =>
    axios.get(true ? 'mocks/closestWins.json' : '/api/closest-wins'),
  addQuestion: (formData, img) => {
    console.log(img);
    const fd = new FormData();
    Object.keys(formData).forEach((key) => fd.append(key, formData[key]));
    if (img) {
      fd.append('img', img, 'img.jpg');
    }
    // using fetch because axios refused to set content type to multipart
    return fetch('/api/questions', {
      method: 'POST',
      body: fd,
    });
  },
  saveQuestion: (formData) => axios.put('/api/questions', formData),
  deleteQuestion: (formData) => axios.delete('/api/questions', formData),
  addUser: (formData) => axios.post('/api/users', formData),
  login: (formData) =>
    mocks ? axios.get('mocks/login.json') : axios.post('/api/login', formData),
};

export default api;
