const { response, json } = require('express');
const Role = require('../models/Role');

const getRoles = async (req, res = response) => {
    try {
        const roles = await Role.find();
        res.json({
            ok: true,
            roles: roles
        })
    } catch (error) {
        console.log(error);
    }
}

const createRole = async (req, res = response) => {
    const role = new Role(req.body);
    try {
        const roleSaved = await role.save();
        res.status(201).json({
            ok: true,
            role: roleSaved
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact with the admin...'
        })
    }
}

const updateRole = async (req, res = response) => {
    const roleId = req.params.id;
    const newRole = req.body;
    try {
        const role = await Role.findById(roleId);
        if (!role) {
            return res.status(404).json({
                ok: false,
                msg: `Role id doesn't exist`
            })
        }
        const roleUpdated = await Role.findByIdAndUpdate(roleId, newRole, { new: true })
        res.json({
            ok: true,
            role: roleUpdated
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Contact with the admin'
        })
    }
}

const deleteRole = async (req, res = response) => {
    const roleId = req.params.id
    try {
        const role = await Role.findById(roleId);
        if (!role) {
            return res.status(404).json({
                ok: false,
                msg: `Role id doesn't exist`
            })
        }
        await Role.findByIdAndDelete(roleId)
        res.json({
            ok: true
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Contact with the admin'
        });
    }
}

module.exports = {
    getRoles,
    createRole,
    updateRole,
    deleteRole
}