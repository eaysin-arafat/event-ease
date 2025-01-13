import BadRequest from "@/errors/bad-request-error";
import Event, { IEvent } from "@/models/Event";
import { Types } from "mongoose";
import { checkEventDuplicate } from "./utils";

/**
 * Create a new event.
 * @param name - The name of the event.
 * @param date - The date of the event.
 * @param location - The location of the event.
 * @param maxAttendees - The maximum number of attendees.
 * @param createdBy - The ID of the user who created the event.
 * @returns The created event.
 * @throws {BadRequest} If any required parameter is missing or invalid.
 */
const create = async (
  name: string,
  date: Date,
  location: string,
  maxAttendees: number,
  createdBy: Types.ObjectId
): Promise<IEvent> => {
  const isDuplicate = await checkEventDuplicate(
    name,
    date,
    location,
    createdBy
  );

  if (isDuplicate)
    throw new BadRequest({
      message: "An event with the same details already exists.",
    });

  const newEvent = new Event({
    name,
    date,
    location,
    maxAttendees,
    createdBy,
  });

  await newEvent.save();
  return newEvent?.toObject();
};

export { create };
