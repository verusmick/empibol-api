var express = require('express');
var router = express.Router();
const db = require('../db/db')

/* GET clean_employers listing. */
router.get('/', function (req, res, next) {
    let query = `SELECT * FROM clean_employers`;
    db.query(query, (err, response) => {
        if (err) {
            next(err);
        } else {
            res.json({
                status: "success",
                message: "Users found",
                data: [...response]
            })
        }
    })
});

/* GET clean_employers by id listing. */
router.get('/:id', function (req, res, next) {
    let query = `SELECT * FROM clean_employers WHERE id_clean_employer = "${req.params.id}"`
    db.query(query, (err, response) => {
        if (err) {
            next(err);
        } else {
            res.json({
                status: "success",
                message: "clean_employers found",
                data: { ...response[0] }
            })
        }
    })
});

/* POST clean_employers listing. */
router.post('/', function (req, res, next) {
    let body = req.body;
    let query = `INSERT INTO clean_employers (        
        full_name, 
        ci, 
        copy_verification, 
        cellphone, 
        telephone, 
        cellphone_ref, 
        address
         ) 
    VALUES (        
        '${body.full_name}', 
        '${body.ci}',
        '${body.copy_verification}', 
        '${body.cellphone}',
        '${body.telephone}',
        '${body.cellphone_ref}',
        '${body.address}');`
    db.query(query, (err, response) => {
        if (err) {
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

/* DELETE clean_employers listing. */
router.delete('/:id', function (req, res, next) {
    let id = req.params.id
    let query = `DELETE FROM clean_employers WHERE clean_employers.id_clean_employer= ${id}`
    db.query(query, (err, response) => {
        if (err) {
            next(err);
        } else {
            status: "success",
                res.json({
                    message: "Clean_employers deleted",
                    data: {}
                })
        }
    })
});

/* PUT clean_employers listing. */
router.put('/:id', function (req, res, next) {
    let body = req.body;
    let id = req.params.id
    let query = `UPDATE clean_employers SET 
    full_name = '${body.full_name}', 
    ci = '${body.ci}', 
    copy_verification = '${body.copy_verification}', 
    cellphone = '${body.cellphone}', 
    telephone = '${body.telephone}', 
    cellphone_ref = '${body.cellphone_ref}',
    address = '${body.address}' 
    WHERE clean_employers.id_clean_employer = ${id};`
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
