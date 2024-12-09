const express = require('express');
const { registrarUsuario, iniciarSesion } = require('../controllers/usuarioController');
const router = express.Router();

router.post('/register', registrarUsuario);
router.post('/login', iniciarSesion);

module.exports = router;
