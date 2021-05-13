const express = require('express')
const router = express.Router()
const { createCustomer } = require('../controllers/customer')

router.route('/').post(createCustomer)




module.exports = router;