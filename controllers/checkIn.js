const { response, json } = require('express');
const CheckInOut = require('../models/CheckInOut');

const createCheckIn = async (req, res = response) => {
    let body = req.body;    
    body = {
        ...body,
        date: new Date(),
        type: 'checkIn'
    }
    const checkIn = new CheckInOut(body);
    try {
        const checkInSaved = await checkIn.save();
        res.status(201).json({
            ok: true,
            checkIn: checkInSaved
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contact with the admin...'
        })
    }
}

module.exports = {
    createCheckIn
}