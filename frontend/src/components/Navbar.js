import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Login from './Login';
import Signup from './Signup';
import AddRestaurant from './AddRestaurant';
import '../App.css'; // Assuming you're using the glassmorphism styles

export default function Navbar({ title }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showAddRestaurant, setShowAddRestaurant] = useState(false);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);
  const handleCloseSignup = () => setShowSignup(false);
  const handleShowSignup = () => setShowSignup(true);
  const handleCloseAddRestaurant = () => setShowAddRestaurant(false);
  const handleShowAddRestaurant = () => setShowAddRestaurant(true);

  return (
    <>
      <nav className="navbar navbar-expand-lg glassmorphism-navbar fixed-top" data-bs-theme="dark">
        <a className="navbar-brand" href="/">{title}</a>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            <li>
              <a className="nav-link active" aria-current="page" href="/about">About</a>                
            </li>
            <li>
              <a className="nav-link active" aria-current="page" href="/demo">Demo</a>                
            </li>
          </ul>
          <div data-bs-theme="dark" className="d-flex">
            <button className="btn btn-outline-info me-2" onClick={handleShowAddRestaurant}>Add Restaurant</button>
            <button className="btn btn-outline-secondary me-2" onClick={handleShowLogin}>Log In</button>
            <button className="btn btn-outline-secondary me-2" onClick={handleShowSignup}>Sign Up</button>
          </div>
        </div>
      </nav>

      <Login show={showLogin} handleClose={handleCloseLogin} />
      <Signup show={showSignup} handleClose={handleCloseSignup} />
      <AddRestaurant show={showAddRestaurant} handleClose={handleCloseAddRestaurant} />
    </>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  title: "Set title here",
};
