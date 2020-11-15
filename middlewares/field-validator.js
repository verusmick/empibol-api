const { res } = require('express');
const { validationResult } = require('express-validator');

const fieldValidator = (req, res = res, next) => {
    // Manage errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }
    next();
}

module.exports = {
    fieldValidator
}