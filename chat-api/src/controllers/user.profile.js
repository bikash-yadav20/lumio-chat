const User = require("../models/User");

exports.get_my_profile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.user_id, {
      attributes: [
        "profile_picture",
        "full_name",
        "user_name",
        "email",
        "is_online",
        "bio",
      ],
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching profile", error });
  }
};

//update profile--------------

exports.update_profile = async (req, res) => {
  try {
    const { full_name, profile_picture, user_name, email, bio } = req.body;

    const user = await User.findByPk(req.user.user_id);

    if (!user) return res.status(404).json({ message: "User not found" });

    await user.update({
      full_name: full_name || user.full_name,
      profile_picture: profile_picture || user.profile_picture,
      user_name: user_name || user.user_name,
      email: email || user.email,
      bio: bio || user.bio,
    });

    res.status(200).json({ message: "Updated Succesfully", user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Update failed something went wront", error });
  }
};

//upload profile picture

exports.upload_profile_picture = async (req, res) => {
  try {
    const imageUrl = req.file?.path;
    console.log("File received:", req.file);

    if (!imageUrl)
      return res.status(400).json({ message: "No image uploaded" });
    const user = await User.findOne({
      where: { user_id: req.user.user_id },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await user.update({
      profile_picture: imageUrl,
    });

    return res.status(200).json({
      message: "Profile picture uploaded successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({ message: "Failed to upload" });
  }
};

//fetch all users----------

exports.fetch_users = async (req, res) => {
  try {
    const users = await User.findAll();

    if (!users) return res.status(404).json({ message: "No users found" });

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "unable to fetch users", error });
  }
};

//fetch User By Id
exports.fetchUserById = async (req, res) => {
  try {
    const { id } = req.params; // destructure the id
    const user = await User.findOne({
      where: { user_id: id },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
