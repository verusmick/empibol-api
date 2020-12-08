const { response } = require('express');
const CheckInOut = require('../models/CheckInOut');

const getInOutStatus = async (req, res = response) => {
    try {
        const checkInOut = await CheckInOut.find().sort('-date').populate('user');
        res.json({
            ok: true,
            report: checkInOut
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
    getInOutStatus
}