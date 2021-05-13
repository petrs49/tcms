const express = require("express");
const router = express.Router();
const { feederImageUpload, getFeeders, getFeeder, createFeeder, updateFeeder
         } = require('../controllers/feeder')
const { protect } = require("../middleware/auth")


router.route("/:codeId/photo").post(protect, feederImageUpload)

router.route("/").post(protect, createFeeder).get(protect, getFeeders)
router.route("/:id").put(protect, updateFeeder).get( protect, getFeeder)


module.exports = router;