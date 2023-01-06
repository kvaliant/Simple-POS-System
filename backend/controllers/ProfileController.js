import User from "../models/UserModel.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.headers.username });
    const json = {
      username: user.username,
      name: user.name,
      role: user.role,
    };
    res.status(200).json(json);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updatedUser = await User.updateOne({ _id: req.headers.username }, { $set: req.body });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
