import Event from "@/models/Event";
import { Types } from "mongoose";

/**
 * Checks if an event already exists with the same details.
 * @param name - The name of the event.
 * @param date - The date of the event.
 * @param location - The location of the event.
 * @param createdBy - The ID of the user who created the event.
 * @returns A boolean indicating whether the event exists.
 */
const checkEventDuplicate = async (
  name: string,
  date: Date,
  location: string,
  createdBy: Types.ObjectId
): Promise<boolean> => {
  const existingEvent = await Event.findOne({
    name,
    date,
    location,
    createdBy,
  });
  return !!existingEvent;
};

export { checkEventDuplicate };
