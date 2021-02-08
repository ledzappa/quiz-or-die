import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import api from '../../api/Api';
import { Category, Question } from '../../interfaces/interfaces';

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

const defaultFormValues = {
  id: null,
  categoryId: 1,
  question: '',
  answer: '',
};

export default function AddQuestion({
  categories,
  setAllQuestions,
  showModal,
  setShowModal,
  question,
}: any) {
  const [formData, setFormData] = useState<Question>(defaultFormValues);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(validateForm(formData));
  }, [formData]);

  useEffect(() => {
    setFormData(question || defaultFormValues);
  }, [showModal, question]);

  const handleFormChange = ({ name, value }: any) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleClose = () => setShowModal(false);

  const handleAddQuestionClick = () => {
    api
      .addQuestion(formData)
      .then(() => {
        setAllQuestions(formData);
        setFormData({ ...formData, question: '', answer: '' });
      })
      .catch((e) => console.log(e));
  };

  const handleSaveQuestionClick = () => {
    api
      .saveQuestion(formData)
      .then(() => {
        setAllQuestions(formData);
        setFormData({ ...formData, question: '', answer: '' });
        setShowModal(false);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
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
              value={formData.categoryId}
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
            onClick={
              question ? handleSaveQuestionClick : handleAddQuestionClick
            }
            disabled={!isFormValid}
          >
            {question ? 'Save ' : 'Add '}question
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
