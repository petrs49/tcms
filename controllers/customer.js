const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Customer = require('../model/Customer')

//method    POST/api/v1/customer
//desc      Create new customer
//access    Private
exports.createCustomer = asyncHandler( async (req, res, next) => {
    const customer = await Customer.create(req.body)

    res.status(201).json({
        success: true,
        msg: 'Customer created succefully...',
        data: customer.propertyId
    })
})
