import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import AboutUs from './components/AboutUs';
import HotelsList from './components/HotelsList';
import DhabaList from './components/DhabaList';
import ChineseList from './components/ChineseList';
import CafeList from './components/CafeList';

import { ToastContainer } from 'react-toastify';

import LandingPage from './components/LandingPage'

import AddRestaurant from './components/AddRestaurant';
import HomePage from './components/HomePage';
import Receipt from './components/Receipt';

import './App.css'

const App = () => {
  return (
    <Router>
      <Navbar title="InstantPlate" />
      <div className="mt-1">
        <Routes>
          <Route path="/demo" element={<LandingPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/signup" element={<Signup handleClose={() => window.history.back()} />} />
          <Route path="/login" element={<Login handleClose={() => window.history.back()} />} />
          <Route path="/addRestaurant" element={<AddRestaurant />} />
          <Route path="/hotel" element={<HotelsList />} />
          <Route path="/dhaba" element={<DhabaList />} />
          <Route path="/chinese" element={<ChineseList />} />
          <Route path="/cafe" element={<CafeList />} />
          <Route path="/receipt" element={<Receipt />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </div>
    </Router>
  );
};

export default App;