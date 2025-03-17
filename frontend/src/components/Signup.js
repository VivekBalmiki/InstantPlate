import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup({ show, handleClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email address.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/signup', { email, password });
      // Handle successful signup (e.g., redirect or show a success message)
      toast.success('Signup successful!');
      setEmail ('');
      setPassword ('');
      setConfirmPassword ('');
      handleClose(); // Close the modal on successful signup
    } catch (error) {
      // Handle error (e.g., display error message)
      console.error(error);
      setError('Signup failed. Please try again.');
      toast.error('Signup failed!');
    }
  };

  return (
    <div>
      <div className={`modal ${show ? 'd-block' : 'd-none'}`} tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Sign Up</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="signupEmail" className="form-label">Email address</label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="form-control" 
                    id="signupEmail" 
                    placeholder="Enter email" 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="signupPassword" className="form-label">Password</label>
                  <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="form-control" 
                    id="signupPassword" 
                    placeholder="Password" 
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="signupConfirmPassword" className="form-label">Confirm Password</label>
                  <input 
                    type="password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    className="form-control" 
                    id="signupConfirmPassword" 
                    placeholder="Confirm Password" 
                  />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Signup.propTypes = {
  // show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};