import User from "../models/UserModel.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addUser = async (req, res) => {
  var user = new User(req.body);

  user.password_salt = "test";
  user.password_hashed = "test";

  try {
    const addedUser = await user.save();
    res.status(201).json(addedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  var body = req.body;
  if (req.body.password === "") {
    body.password_hashed = user.password_hashed;
    body.password_salt = user.password_salt;
  }

  try {
    const updatedUser = await User.updateOne({ _id: req.params.id }, { $set: body });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.deleteOne({ _id: req.params.id });
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
