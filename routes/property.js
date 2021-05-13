const express = require("express");
const router = express.Router();
const { createProperty, getProperty, updateProperty, propertyImageUpload,
        propertyServicePointImage, getProperties } = require('../controllers/property')
// const { createProperty, getProperty, updateProperty } = require('../controllers/property');
const { protect } = require("../middleware/auth")


router.route("/:propertyId/photo").post(protect, propertyImageUpload)
router.route("/:propertyId/sp-photo").post(protect, propertyServicePointImage )

router.route("/").post(protect, createProperty).get(protect, getProperties)
router.route("/:id").put(protect, updateProperty).get(protect, getProperty)


module.exports = router;