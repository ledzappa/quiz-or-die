import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import api from './../../api/Api';
import Joi from 'joi';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const openModal = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const schema = Joi.object({
    username: Joi.string().max(50).required(),
    password: Joi.string().min(6).max(50).required(),
    email: Joi.string().required().email({ tlds: false }),
    passwordRepeat: Joi.ref('password'),
  });

  const handleRegisterClick = () => {
    const { error } = schema.validate(formData);

    if (!error) {
      api
        .addUser(formData)
        .then(() => 'user added!')
        .catch((e) => console.log(e));
    } else {
      setErrorMsg(error.message);
    }
  };

  const handleFormChange = ({ name, value }: any) => {
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
  };

  return (
    <div>
      <button className="btn btn-outline-light w-100" onClick={openModal}>
        Register
      </button>
      <Modal className="text-dark" show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            Fill out the form and click on Register. A confirmation will be sent
            to your email.
          </p>
          <div className="form-group">
            <label>Username</label>
            <input
              onChange={(e) => handleFormChange(e.target)}
              className="form-control"
              name="username"
              value={formData.username}
            ></input>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              onChange={(e) => handleFormChange(e.target)}
              className="form-control"
              name="email"
              value={formData.email}
            ></input>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => handleFormChange(e.target)}
              className="form-control"
              name="password"
              value={formData.password}
            ></input>
          </div>
          <div className="form-group">
            <label>Repeat password</label>
            <input
              type="password"
              onChange={(e) => handleFormChange(e.target)}
              className="form-control"
              name="passwordRepeat"
              value={formData.passwordRepeat}
            ></input>
          </div>
          {errorMsg.length > 0 && (
            <div className="alert alert-danger alert-icon">{errorMsg}</div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleRegisterClick}
          >
            Register
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
