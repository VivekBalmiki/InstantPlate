// Import required modules
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Restaurant = require('../models/restaurant');
const bcrypt = require('bcryptjs');
const cors = require('cors');

// Use CORS middleware
router.use(cors());

// Use JSON parsing middleware
router.use(express.json());

// ===========================
// Signup Route
// ===========================
router.post('/api/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user and save to the database
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    // Send success response
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ===========================
// Login Route
// ===========================
router.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Send success response
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ===========================
// Add Restaurant Route
// ===========================
router.post('/api/addRestaurant', async (req, res) => {
  // Extract restaurant details from request body
  const { name, category, location } = req.body;

  try {
    // Check if the restaurant already exists
    const existingRestaurant = await Restaurant.findOne({ name });
    if (existingRestaurant) {
      // Return 400 error if restaurant already exists
      return res.status(400).json({ error: "Restaurant already exists" });
    }

    // Create a new restaurant and save to the database
    const newRestaurant = new Restaurant({ name, category, location });
    await newRestaurant.save();

    // Send success response
    res.status(201).json({ message: 'Restaurant added successfully', restaurant: newRestaurant });
  } catch (error) {
    // Log error and return 500 error response
    console.error('Error adding restaurant:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

module.exports = router;