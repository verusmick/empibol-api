/**
 Auth Routes
 /api/auth 
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { createUser, userLogin, revalidateToken } = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/field-validator');
const { jwtValidator } = require('../middlewares/jwt-validator');


router.post('/', userLogin);

router.get('/renew',
    [jwtValidator],
    revalidateToken);

module.exports = router;