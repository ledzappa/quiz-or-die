import React, { useState, useEffect } from 'react';
import api from '../../api/Api';

export default function AddQuestion({ categories }) {
  const [formData, setFormData] = useState({
    category: '',
    question: '',
    answer: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(validateForm(formData));
  }, [formData]);

  const handleFormChange = ({ name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = ({ category, question, answer }) => {
    console.log(answer);
    if (category.length === 0) {
      return false;
    }
    if (question.length < 10) {
      return false;
    }
    if (answer.length === 0) {
      return false;
    }
    return true;
  };

  const submitQuestion = () => {
    console.log(formData);
    api
      .addQuestion(formData)
      .then(() => console.log('usccess'))
      .catch(() => console.log('error'));
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-sm-8 col-md-6">
        <h1>Submit question</h1>
        <p>
          Select a category and fill out the form in order to submit a question.
          Your question will be reviewed by an administrator before it gets
          added to the app. Thanks for making the game better! &lt;3
        </p>
        <form>
          <div className="form-group">
            <label>Category</label>
            <select
              className="form-control"
              name="category"
              onChange={(e) => handleFormChange(e.target)}
            >
              {categories.map((category, idx) => (
                <option value={category.id} key={idx}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Question</label>
            <textarea
              onChange={(e) => handleFormChange(e.target)}
              className="form-control"
              name="question"
              value={formData.question}
              rows="2"
            ></textarea>
          </div>
          <div className="form-group">
            <label>Answer</label>
            <input
              onChange={(e) => handleFormChange(e.target)}
              className="form-control"
              name="answer"
              value={formData.answer}
            ></input>
          </div>
          <hr />
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => submitQuestion()}
            disabled={!isFormValid}
          >
            Submit question
          </button>
        </form>
      </div>
    </div>
  );
}
