/**
 Clients Routes
 /api/image
*/

const { Router } = require('express');
const multipart = require('connect-multiparty');

const { uploadImg } = require('../controllers/image');

const router = Router();

const multipartMiddleware = multipart({
    uploadDir: './images'
});

router.post('/', [multipartMiddleware], uploadImg);

module.exports = router;