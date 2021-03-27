import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import api from '../../api/Api';
import { Category, Question } from '../../interfaces/interfaces';

export const validateForm = ({ categoryId, question, answer }: any) => {
  if (Number(categoryId) === 0) return false;
  if (question.length < 10) return false;
  if (answer.length === 0) return false;
  return true;
};

const defaultFormValues = {
  id: null,
  question: '',
  answer: '',
  categoryId: 0,
};

// can't keep selected image in state
let addedImage: any;

export default function AddQuestion({
  categories,
  categoryId,
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
    setFormData(question || { ...defaultFormValues, categoryId });
  }, [showModal, question]);

  const handleFormChange = ({ name, value }: any) => {
    let _value = name === 'categoryId' ? Number(value) : value;
    setFormData({ ...formData, [name]: _value });
  };

  const handleImageChange = (target: any) => {
    addedImage = target.files[0];
  };

  const handleClose = () => setShowModal(false);

  const handleAddQuestionClick = () => {
    api
      .addQuestion(formData, addedImage)
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
          <Modal.Title>{question ? 'Edit ' : 'Add '}question</Modal.Title>
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
              <option value="0">Choose</option>
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
          {!question && (
            <div className="form-group">
              <label>Image</label>
              <div>
                <input
                  type="file"
                  onChange={(e) => handleImageChange(e.target)}
                  name="img"
                />
              </div>
            </div>
          )}
          {question?.img && (
            <div>
              <img
                src={`https://quizmageddon.s3.eu-north-1.amazonaws.com/${question.img}`}
              />
            </div>
          )}
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
