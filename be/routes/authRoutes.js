const express = require("express");
const router = express.Router();
const { registerUser, loginUser, registerArtist, loginArtist } = require("../controllers/authController");

router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.post("/artist/register", registerArtist);
router.post("/artist/login", loginArtist);

module.exports = router;
