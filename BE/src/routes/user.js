const express = require('express');
const userController = require('../controller/userController');
const router = express.Router();

router.get('/', userController.getAllUser);
router.post('/', userController.createUser);
router.put('/:id', userController.changeGroupUser);
router.delete('/:id', userController.deleteUser)

module.exports = router;