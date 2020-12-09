/**
 Users Routes
 /api/users
*/

const { Router } = require('express');

const { jwtValidator } = require('../middlewares/jwt-validator');
const users = require('../controllers/users');
const { createUser, getUsers, updateUser, deleteUser, getUserById } = require('../controllers/users');

const router = Router();
// router.use(jwtValidator);

router.get('/', [jwtValidator], getUsers);
router.get('/:id', [jwtValidator], getUserById);
router.post('/', createUser);
router.put('/:id', [jwtValidator], updateUser);
router.delete('/:id', [jwtValidator], deleteUser);


module.exports = router;