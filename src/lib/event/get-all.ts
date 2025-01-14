import InternalServerError from "@/errors/internal-server-error";
import Event, { IEvent } from "@/models/Event";

/**
 * Fetch all events from the database.
 * @returns A list of events.
 */
export const getAll = async (): Promise<IEvent[]> => {
  try {
    const events = await Event.find().populate("createdBy", "email");
    return events;
  } catch (err) {
    throw new InternalServerError();
  }
};
