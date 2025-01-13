import mongoose, { Document, Schema } from "mongoose";

export interface IAttendee extends Document {
  user: mongoose.Types.ObjectId;
  event: mongoose.Types.ObjectId;
}

const attendeeSchema = new Schema<IAttendee>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
});

const Attendee = mongoose.model<IAttendee>("Attendee", attendeeSchema);
export default Attendee;
