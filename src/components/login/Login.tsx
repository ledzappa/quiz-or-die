import React, { useState } from 'react';
import Register from './Register';
import { useHistory } from 'react-router-dom';
import api from './../../api/Api';

export default function Login({ setUser }: any) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const history = useHistory();

  const handleLoginClick = () => {
    api
      .login(formData)
      .then((res) => {
        setUser(res.data);
        localStorage.setItem('accessToken', res.data.accessToken);
        history.push('/home');
      })
      .catch((e) => setError(e.response.data));
  };

  const handleFormChange = ({ name, value }: any) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <div className="row justify-content-center animate__animated animate__fadeIn">
        <div className="col-12 col-sm-6 col-md-4 pt-0 pt-sm-5">
          <h1>Login</h1>
          <p>Login below to start playing Quizmageddon!</p>

          <div className="form-group">
            <label>Username</label>
            <input
              className="form-control"
              name="username"
              onChange={(e) => handleFormChange(e.target)}
            ></input>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={(e) => handleFormChange(e.target)}
            ></input>
          </div>
          {error && <div className="alert alert-danger animate__animated animate__flash">{error}</div>}
          <hr />
          <button
            className="btn btn-secondary w-100 mb-4"
            onClick={handleLoginClick}
          >
            Login
          </button>
          <Register></Register>
        </div>
      </div>
    </div>
  );
}
