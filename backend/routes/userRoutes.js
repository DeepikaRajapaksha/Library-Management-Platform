const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');

router.get('/', async (req, res) => {
  const users = await userModel.getAllUsers();
  res.json(users);
});

router.post('/', async (req, res) => {
  const { full_name, username, password, email, membership_id, role } = req.body;
  try {
    const result = await userModel.createUser({
      full_name,
      username,
      password,
      email,
      membership_id,
      role
    });
    res.json({ success: true, id: result[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

