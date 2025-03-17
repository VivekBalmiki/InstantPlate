import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login({ show, handleClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      // Handle successful login (e.g., store token, redirect)
      console.log(response.data.message);
      toast.success(response.data.message);
      setEmail(''); // Clear email
      setPassword(''); // Clear password
      handleClose(); // Close the modal on successful login
    } catch (error) {
      // Handle error (e.g., display error message)
      console.error(error);
      // setError('Login failed. Please check your credentials and try again.');
      setError('Login failed.');
      toast.error('Login failed.');
    }
  };

  return (
    <div className={`modal ${show ? 'd-block' : 'd-none'}`} tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog" role="document">  
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Log In</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="loginEmail" className="form-label">Email address</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="form-control" 
                  id="loginEmail" 
                  placeholder="Enter email" 
                />
              </div>
              <div className="mb-3">
                <label htmlFor="loginPassword" className="form-label">Password</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="form-control" 
                  id="loginPassword" 
                  placeholder="Password" 
                />
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <button type="submit" className="btn btn-primary">Log In</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  // show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
