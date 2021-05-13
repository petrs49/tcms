const express = require("express");
const router = express.Router();
const {getUsers, createUser, getUser, loginUser, logout} = require("../controllers/user");
const { protect } = require("../middleware/auth")

router.get('/logout', logout)
router.route("/").get(protect, getUsers).post(createUser)
router.post("/login", loginUser)
router.route("/:id").get(getUser);


module.exports = router;