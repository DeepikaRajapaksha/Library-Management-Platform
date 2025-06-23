const db = require('../db'); // This assumes you have a db.js file that exports your Knex instance

// Get all users
const getAllUsers = async () => {
  return await db('users').select('*');
};

// Get a single user by ID
const getUserById = async (id) => {
  return await db('users').where({ id }).first();
};

// Get a user by username (for login)
const getUserByUsername = async (username) => {
  return await db('users').where({ username }).first();
};

// Create a new user
const createUser = async (userData) => {
  return await db('users').insert(userData);
};

// Update user by ID
const updateUser = async (id, userData) => {
  return await db('users').where({ id }).update(userData);
};

// Delete user by ID
const deleteUser = async (id) => {
  return await db('users').where({ id }).del();
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser
};
