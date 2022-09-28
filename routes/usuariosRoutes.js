const express = require("express");
const router = express.Router();

const usuarioController = require("../controllers/usuarioController");

router.post('', usuarioController.create);
router.post('/login', usuarioController.create);

module.exports = router; 
