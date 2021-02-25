import { any } from 'joi';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Category } from '../../interfaces/interfaces';

export default function Settings({
  categories,
  showModal,
  setCategories,
  setShowModal,
}: {
  categories: Category[];
  showModal: boolean;
  setShowModal: Function;
  setCategories: Function;
}) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
  });
  const [errorMsg, setErrorMsg] = useState('');

  const openModal = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleCategoryChange = ({ target: { checked, name } }: any) => {
    const _categories = categories.map((category) =>
      category.id === Number(name)
        ? { ...category, disabled: !checked }
        : category
    );
    console.log(name);
    console.log(_categories);
    setCategories(_categories);
  };

  const handleSaveSettingsClick = () => {
    console.log('save settings');
  };

  return (
    <Modal className="text-dark" show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="form-group">
          <label>Enabled Categories</label>
          {categories.map((category) => (
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name={category.id.toString()}
                checked={!category.disabled}
                onChange={handleCategoryChange}
              />
              <label className="form-check-label">{category.name}</label>
            </div>
          ))}
        </div>
        {errorMsg.length > 0 && (
          <div className="alert alert-danger alert-icon">{errorMsg}</div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <button type="button" className="btn btn-primary" onClick={handleClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}
