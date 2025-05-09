import express from "express";
import {
    bookActivity,
    getMyBookings,
    listactivity,
} from "../controllers/activity_controller.js";
import { verifyToken } from "../controllers/user_controllers.js";
const router = express.Router();

router.get("/activities", listactivity);
router.post("/book", verifyToken, bookActivity);
router.get("/book", verifyToken, getMyBookings);

export { router as activityRouter };
