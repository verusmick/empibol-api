const { response, json } = require('express');
const CheckInOut = require('../models/CheckInOut');

const createCheckOut = async (req, res = response) => {

    let body = req.body;
    body = {
        ...body,
        date: new Date(),
        type: 'checkOut'
    }
    const checkOut = new CheckInOut(body);
    try {
        const checkOutSaved = await checkOut.save();
        res.status(201).json({
            ok: true,
            checkOut: checkOutSaved
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
    createCheckOut
}