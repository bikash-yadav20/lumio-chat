const User = require("../models/User");
const UserSchema = require("../validators/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register user
exports.register_user = async (req, res) => {
  //verify input data
  const user_data = UserSchema.safeParse(req.body);

  if (!user_data.success) {
    const errors = user_data.error.issues.map((issues) => issues.message);
    return res.status(400).json({ message: "Invalid input", errors });
  }
  //register user

  try {
    //hash password before saving
    const hashed_password = await bcrypt.hash(user_data.data.password, 10);

    const registered_user = await User.create({
      ...user_data.data,
      password: hashed_password,
    });

    const token = jwt.sign(
      {
        user_id: registered_user.user_id,
        user_name: registered_user.user_name,
      },
      process.env.JWT_SECRET_KEY,

      { expiresIn: "1h" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 1000,
    });

    res.status(201).json({ message: "Signup Success" });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error });
  }
};

//login user

exports.login_user = async (req, res) => {
  const { user_name, password } = req.body;

  try {
    const user = await User.findOne({
      where: { user_name },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //compare password

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //send jwt token

    const token = jwt.sign(
      { user_id: user.user_id, user_name: user.user_name },
      process.env.JWT_SECRET_KEY,

      { expiresIn: "1h" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 1000,
    });

    //update last scene and online status

    user.is_online = true;
    user.last_seen = Date.now();
    user.save();

    res.status(200).json({
      user_id: user.user_id,
      profile_picture: user.profile_picture,
      full_name: user.full_name,
      user_name: user.user_name,
      email: user.email,
      is_online: user.is_online,
      last_seen: user.last_seen,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Login failed", error });
  }
};
