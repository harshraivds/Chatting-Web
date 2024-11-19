import express from "express";
import { login, logout, signup, forgotPassword, resetPassword } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/forgot",forgotPassword);
router.put("/password/reset/:token", resetPassword);

export default router;
