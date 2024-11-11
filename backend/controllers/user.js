const userModel = require("../models/user");
const bcrypt = require("bcryptjs");

//register a user
//@POST /register
const registerUser = async (req, res) => {
  try {
    const { password, ...others } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = new userModel({
      ...others,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "user creation successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all users
//GET / users
const getUsers = async (req, res) => {
  try {
    const allUsers = await userModel.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, getUsers };
