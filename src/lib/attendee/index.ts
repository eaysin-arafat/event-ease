import BadRequest from "@/errors/bad-request-error";
import NotFoundError from "@/errors/not-found-error";
import Attendee from "@/models/Attendee";
import Event from "@/models/Event";

export const registerAttendeeService = async (
  eventId: string,
  userId: string,
  io: any
) => {
  // Find the event by its ID
  const event = await Event.findById(eventId);

  if (!event) throw new NotFoundError({ message: "Event not found" });

  if (event.attendeesCount >= event.maxAttendees) {
    throw new BadRequest({
      message: "Event is full",
    });
  }

  const newAttendee = new Attendee({ user: userId, event: eventId });
  await newAttendee.save();

  event.attendeesCount += 1;
  await event.save();

  io.emit("event:update", {
    eventId,
    message: "A new attendee has registered",
  });

  return { event, newAttendee };
};
