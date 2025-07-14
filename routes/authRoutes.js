const express = require('express');
const { login, deleteUser, listUsers } = require('../controllers/authController');
const router = express.Router();

// Ruta de login
router.post('/login', login);

router.delete("/delete-user/:userId", deleteUser);

// Ruta para listar usuarios (para debug)
router.get("/list-users", listUsers);

module.exports = router;
