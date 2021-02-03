import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import api from '../../api/Api';
import { Category } from '../../interfaces/interfaces';

export const validateForm = ({ categoryId, question, answer }: any) => {
  if (categoryId.length === 0) {
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

export default function AddQuestion({ categories, setAllQuestions }: any) {
  const [formData, setFormData] = useState({
    categoryId: 1,
    question: '',
    answer: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setIsFormValid(validateForm(formData));
  }, [formData]);

  const handleFormChange = ({ name, value }: any) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleClose = () => setShowModal(false);
  const openModal = () => setShowModal(true);

  const submitQuestion = () => {
    api
      .addQuestion(formData)
      .then(() => {
        setAllQuestions(formData);
        setFormData({ ...formData, question: '', answer: '' });
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <button className="btn btn-outline-light w-100" onClick={openModal}>
        Add Question
      </button>
      <Modal className="text-dark" show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add question</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            Select a category and fill out the form in order to submit a
            question. Your question will be reviewed by an administrator before
            it gets added to the app. Thanks for making the game better! &lt;3
          </p>
          <div className="form-group">
            <label>Category</label>
            <select
              className="form-control"
              name="categoryId"
              onChange={(e) => handleFormChange(e.target)}
            >
              {categories.map((category: Category, idx: number) => (
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
              rows={2}
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
        </Modal.Body>

        <Modal.Footer>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => submitQuestion()}
            disabled={!isFormValid}
          >
            Submit question
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
