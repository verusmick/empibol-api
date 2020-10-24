var express = require('express');
var router = express.Router();
const db = require('../db/db')

/* GET users listing. */
router.get('/', function (req, res, next) {
  let query = `SELECT * FROM users`;
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

/* GET users by id */
router.get('/:uid', function (req, res, next) {
  let query = `SELECT * FROM users WHERE ci = "${req.params.uid}"`
  db.query(query, (err, response) => {
    if (err) {
      next(err);
    } else {
      res.json({
        status: "success",
        message: "User found",
        data: { ...response[0] }
      })
    }
  })

});

/* POST users listing. */
router.post('/', function (req, res, next) {
  res.send('respond with a POST');
});

/* DELETE users listing. */
router.delete('/:uid', function (req, res, next) {
  res.send('respond with a DELETE');
});
module.exports = router;
