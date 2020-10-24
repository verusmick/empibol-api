var express = require('express');
var router = express.Router();
const db = require('../db/db')

/* GET clients listing. */
router.get('/', function (req, res, next) {
    let query = `SELECT * FROM clients`;
    db.query(query, (err, response) => {
        if (err) {
            next(err);
        } else {
            res.json({
                status: "success",
                message: "clients found",
                data: [...response]
            })
        }
    })
});

/* GET client by id listing. */
router.get('/:id', function (req, res, next) {
    let query = `SELECT * FROM clients WHERE id = "${req.params.id}"`
    db.query(query, (err, response) => {
        if (err) {
            next(err);
        } else {
            res.json({
                status: "success",
                message: "Client found",
                data: { ...response[0] }
            })
        }
    })
});

/* POST Client listing. */
router.post('/', function (req, res, next) {
    let body = req.body;
    let query = `INSERT INTO clients (
        company_name, 
        manager_name,
        nit, 
        technical_specifications, 
        cellphone, 
        address) 
    VALUES (        
        '${body.company_name}', 
        '${body.manager_name}',
        '${body.nit}', 
        '${body.technical_specifications}',
        '${body.cellphone}',
        '${body.address}');`
    db.query(query, (err, response) => {
        if (err) {
            console.log(err)
            next(err);
        } else {
            res.json({
                status: "success",
                message: "Client added",
                data: {}
            })
        }
    })
});

/* DELETE users listing. */
router.delete('/:id', function (req, res, next) {
    let id = req.params.id
    let query = `DELETE FROM clients WHERE clients.id_client = ${id}`
    db.query(query, (err, response) => {
        if (err) {
            next(err);
        } else {
            status: "success",
                res.json({
                    message: "Client deleted",
                    data: {}
                })
        }
    })
});

/* Update users listing. */
router.put('/:id', function (req, res, next) {
    let body = req.body;
    let id = req.params.id
    let query = `UPDATE clients SET 
    company_name = '${body.company_name}', 
    manager_name = '${body.manager_name}', 
    nit = '${body.nit}', 
    technical_specifications = '${body.technical_specifications}', 
    cellphone = '${body.cellphone}', 
    address = '${body.address}' 
    WHERE clients.id_client = ${id};`
    db.query(query, (err, response) => {
        if (err) {
            next(err);
        } else {
            status: "success",
                res.json({
                    message: "Client Updated",
                    data: {}
                })
        }
    })
});

module.exports = router;