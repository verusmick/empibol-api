const { response } = require('express');
const bcrypt = require('bcryptjs');

const Client = require('../models/Client');

const getClients = async (req, res = response) => {
    try {
        const clients = await Client.find();
        res.json({
            ok: true,
            clients
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Porfavor contacte con el Administrador'
        });
    }
}

const createClient = async (req, res = response) => {
    const client = new Client(req.body);
    try {
        const clientSaved = await client.save();
        res.json({
            ok: true,
            event: clientSaved
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Porfavor contacte con el Administrador'
        });
    }
}

const updateClient = async (req, res = response) => {
    const clientId = req.params.id;
    const newClient = req.body;
    try {
        const client = await Client.findById(clientId);
        if (!client) {
            return res.status(404).json({
                ok: false,
                msg: `El cliente no existe.`
            })
        }
        const clientUpdated = await Client.findByIdAndUpdate(
            clientId,
            newClient,
            { new: true }
        )
        res.json({
            ok: true,
            client: clientUpdated
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Porfavor contacte con el Administrador'
        });
    }
}

const deleteClient = async (req, res = response) => {
    const clientId = req.params.id;

    try {
        const client = await Client.findById(clientId);
        if (!client) {
            return res.status(404).json({
                ok: false,
                msg: `El cliente no existe.`
            })
        }
        await Client.findByIdAndDelete(clientId);
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
    getClients,
    createClient,
    updateClient,
    deleteClient
}