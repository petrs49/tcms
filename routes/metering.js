const express = require("express");
const router = express.Router();
const { getMetering, getMeters, updateMetering, createMetering, createSchedule,
        beforeInstallationImageUpload, afterInstallationImageUpload
} = require('../controllers/metering')

const { protect } = require("../middleware/auth")

router.route("/:propertyId/photo").post(protect, beforeInstallationImageUpload)
router.route("/:propertyId/sp-photo").post(protect, afterInstallationImageUpload )

router.route('/schedule').post(protect, createSchedule )
router.route("/").post(protect, createMetering).get(protect, getMeters)
router.route("/:id").put(protect, updateMetering).get(protect, getMetering)


module.exports = router;