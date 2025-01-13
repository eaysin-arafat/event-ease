import { eventService } from "@/lib";
import { requestMiddleware } from "@/middleware/request-middleware";
import { eventSchema } from "@/schemas/event";
import { Request, Response } from "express";

const createEvent = async (req: Request, res: Response) => {
  const { name, date, location, maxAttendees } = req.body;
  const createdBy = req.user?.userId;

  try {
    const newEvent = eventService?.create(
      name,
      date,
      location,
      maxAttendees,
      createdBy
    );

    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export default requestMiddleware(createEvent, {
  validation: { body: eventSchema },
});
