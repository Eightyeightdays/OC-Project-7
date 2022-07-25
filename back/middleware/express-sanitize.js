const { body, validationResult } = require('express-validator');

module.exports = [
    body("content").trim().escape(),    // remove whitespace at start and end
    body("title").trim().escape(),      // also remove < >
    (req, res, next)=> next(),
]