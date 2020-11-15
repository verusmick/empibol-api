/**
 Users Routes
 /api/users
*/

const { Router } = require('express');

const { jwtValidator } = require('../middlewares/jwt-validator');
const users = require('../controllers/users');
const { createUser, getUsers, updateUser, deleteUser } = require('../controllers/users');

const router = Router();
router.use(jwtValidator);

router.get('/', getUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


module.exports = router;