import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    dateTime: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
});

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    activity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Activity",
        required: true,
    },
    bookedAt: { type: Date, default: Date.now },
});

const activityModel = mongoose.model("Activity", activitySchema);
const bookModel = mongoose.model("Bookings", bookingSchema);

export { activityModel, bookModel };
