const express = require("express");
const router = express.Router();
const { getTransformer, getTransformers, updateTransformer, createTransformer,
         transformerImageUpload } = require('../controllers/transformer')
const { protect } = require("../middleware/auth")

router.route("/:codeId/photo").post(protect, transformerImageUpload)

router.route("/").post(protect, createTransformer).get(protect, getTransformers)
router.route("/:id").put(protect, updateTransformer).get(protect, getTransformer)


module.exports = router;