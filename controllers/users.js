const { response } = require('express');
const bcrypt = require('bcryptjs');

const { generateJWT } = require('../utils/jwt');
const User = require('../models/User');
const Role = require('../models/Role');


const getUsers = async (req, res = response) => {
    const { role: roleName } = req.query;    
    try {
        if (roleName) {
            const role = await Role.findOne({ name: roleName })            
            if (!role) {

                return res.status(404).json({
                    ok: false,
                    msg: 'El Rol enviado en los parametros no Existe'
                })
            } else {
                const users = await User.find({ role: { '_id': role._id } }).populate('role')
                res.json({
                    ok: true,
                    users
                })
            }
        } else {
            const users = await User.find().populate('role');
            res.json({
                ok: true,
                users
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Porfavor contacte con el Administrador'
        });
    }
}

const getUserById = async (req, res = response) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: 'El Usuario no existe'
            })
        }
        res.json({
            ok: true,
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Porfavor contacte con el Administrador'
        });
    }
}

const createUser = async (req, res = response) => {
    const { ci, password } = req.body;
    try {
        let user = await User.findOne({ ci });
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: `Ya existe un usuario con ese Carnet de Identidad ${ci}`
            });
        }
        user = new User(req.body);

        // hash password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        await user.save();

        // Gen JWT
        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Porfavor contacte con el Administrador'
        });
    }
}

const updateUser = async (req, res = response) => {
    const userId = req.params.id;
    const newUser = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: `El usuario no existe.`
            })
        }

        // hash password
        const salt = bcrypt.genSaltSync();
        newUser.password = newUser.password ? bcrypt.hashSync(newUser.password, salt) : user.password;
        const userUpdated = await User.findByIdAndUpdate(userId, newUser, { new: true })

        res.json({
            ok: true,
            user: userUpdated
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Porfavor contacte con el Administrador'
        });
    }
}

const deleteUser = async (req, res = response) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: `El usuario no existe.`
            })
        }
        await User.findByIdAndDelete(userId);
        res.json({
            ok: true
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Porfavor contacte con el Administrador'
        });
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}