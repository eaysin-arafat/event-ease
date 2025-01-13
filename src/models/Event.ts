import mongoose, { Document, Schema } from "mongoose";

export interface IEvent extends Document {
  name: string;
  date: Date;
  location: string;
  maxAttendees: number;
  createdBy: mongoose.Types.ObjectId;
  attendeesCount: number;
}

const eventSchema = new Schema<IEvent>({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  maxAttendees: { type: Number, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  attendeesCount: { type: Number, default: 0 },
});

const Event = mongoose.model<IEvent>("Event", eventSchema);
export default Event;
