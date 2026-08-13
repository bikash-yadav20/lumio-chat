const register_user = require("../controllers/auth.controller");
const express = require("express");
const { tokenVerification } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/register", register_user.register_user);
router.post("/login", register_user.login_user);
router.post("/logout", tokenVerification, register_user.logoutUser);

//get current user info
router.get("/me", tokenVerification, (req, res) => {
  res.json({
    user_id: req.user.user_id,
    user_name: req.user.user_name,
  });
});

module.exports = router;
