const { body, validationResult } = require('express-validator');

module.exports = [
    body("content").trim().escape(),
    body("title").trim().escape(),
    (req, res, next)=> next(),
]