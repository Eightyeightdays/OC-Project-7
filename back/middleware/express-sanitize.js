const { body, validationResult } = require('express-validator');

module.exports = [
    body("content").not().isEmpty().trim().escape(),
    body("title").not().isEmpty().trim().escape(),
    (req, res, next)=> next(),
]