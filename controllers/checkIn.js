const { response, json } = require('express');
const CheckIn = require('../models/CheckIn');

const createCheckIn = async (req, res = response) => {

    let body = req.body;
    body = {
        ...body,
        date: new Date()
    }
    const checkIn = new CheckIn(body);
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