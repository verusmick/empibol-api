const { response } = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const { generateJWT } = require('../utils/jwt');
const User = require('../models/User');



const userLogin = async (req, res = response) => {
    const { ci, password } = req.body;
    try {
        const user = await User.findOne({ ci }).populate('role');
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un usuario con ese Carnet de Identidad`
            });
        }

        // Confirm Passwords
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            res.status(400).json({
                ok: false,
                msg: `Error en la Contraseña`
            });
        }
        // Gen JWT
        const token = await generateJWT(user.id, user.name);
        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
            role: user.role
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact with the admin'
        });
    }
}

const revalidateToken = async (req, res = response) => {
    const { uid, name } = req;
    // Gen JWT
    const token = await generateJWT(uid, name);
    res.json({
        ok: true,
        token,
        uid,
        name
    })
}
module.exports = {    
    userLogin,
    revalidateToken
}