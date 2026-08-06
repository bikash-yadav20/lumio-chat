const { default: upload } = require("../config/cloudinary");
const userProfile = require("../controllers/user.profile");
const auth = require("../middleware/auth.middleware");
const express = require("express");

const router = express.Router();

//get logged in user profile
router.get("/profile", auth.tokenVerification, userProfile.get_my_profile);

router.put(
  "/update-profile",
  auth.tokenVerification,
  userProfile.update_profile,
);

//get all users
router.get("/users", auth.tokenVerification, userProfile.fetch_users);

//single user profile for each chat section
router.get("/users/:id", auth.tokenVerification, userProfile.fetchUserById);

//update profile picture
router.post(
  "/upload-dp",
  auth.tokenVerification,
  upload.single("profilePic"),
  userProfile.upload_profile_picture,
);

module.exports = router;
