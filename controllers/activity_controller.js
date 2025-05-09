import { activityModel, bookModel } from "../models/activity_model.js";

export async function listactivity(req, res) {
    try {
        const activities = await activityModel.find();

        res.status(200).json({
            success: true,
            count: activities.length,
            data: activities,
        });
    } catch (error) {
        console.error("Error listing activities:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching activities",
        });
    }
}

export async function bookActivity(req, res) {
    try {
        const { activityId } = req.body;
        const userId = req.user.userId;

        const activity = await activityModel.findById(activityId);
        if (!activity)
            return res.status(404).json({ message: "Activity not found" });

        const booking = new bookModel({ user: userId, activity: activityId });
        await booking.save();

        res.status(201).json({
            message: "Activity booked successfully",
            booking,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

export const getMyBookings = async (req, res) => {
    try {
        const userId = req.user.userId;
        const bookings = await bookModel
            .find({ user: userId })
            .populate("activity");
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
