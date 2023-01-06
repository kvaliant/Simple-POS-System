import express from "express";

import { getUsers, getUserById, addUser, updateUser, deleteUser } from "../controllers/UserController.js";
import { getProfile, updateProfile } from "../controllers/ProfileController.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/user/:id", getUserById);
router.post("/user", addUser);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

router.get("/profile", getProfile);
router.patch("/profile", updateProfile);

export default router;
