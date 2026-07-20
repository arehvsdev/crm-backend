const express = require("express");
const { createUser, healthCheck } = require("../controllers/UserController");
const router = express.Router();


router.post('/user', createUser);
router.get('/health', healthCheck);

module.exports = router;