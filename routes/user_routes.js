import express from "express";
const router = express.Router();

import {
    login,
    logout,
    signup,
    verifyToken,
} from "../controllers/user_controllers.js";

router.post("/signup", signup);

router.post("/login", login);

const verifyUser = router.get("/verify", verifyToken, (req, res) => {
    return res.json({ status: true, message: "authorized" });
});

router.get("/logout", logout);

export { router as UserRouter };
