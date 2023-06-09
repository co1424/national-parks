const {
    body,
    validationResult
} = require('express-validator')
const parkValidationRules = () => {
    return [
        // firstName must be an string
        body('parkName')
        .isString()
        .withMessage('parkName name must be a string')
        .not()
        .isNumeric()
        .withMessage('parkName cannot be a numeric value'),
        // lastName must be a string
        body('googleMapsLocation')
        .isString()
        .withMessage('googleMapsLocation must be a string'),
        // mainAttractions must be a string:
        body('mainAttractions')
        .isString()
        .withMessage('mainAttractions must be a string')
        .not()
        .isNumeric()
        .withMessage('mainAttractions cannot be a numeric value'),
        // availableLodging must be a string,
        body('availableLodging')
        .isString()
        .withMessage('availableLodging must be a string')
        .not()
        .isNumeric()
        .withMessage('availableLodging cannot be a numeric value'),

    ]
}


// Middleware Function:
const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = errors.array().map(err => {
        return {
            [err.param]: err.msg
        };
    });

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = {
    parkValidationRules,
    validate,
}