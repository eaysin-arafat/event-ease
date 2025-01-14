import { eventService } from "@/lib";
import { requestMiddleware } from "@/middleware/request-middleware";
import { eventSchema } from "@/schemas/event";
import { NextFunction, Request, Response } from "express";

const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  const { name, date, location, maxAttendees } = req.body;
  const createdBy = req.user?.userId;

  try {
    const newEvent = await eventService?.create(
      name,
      date,
      location,
      maxAttendees,
      createdBy
    );

    const response = {
      status: "success",
      statusCode: 201,
      message: "Event created successfully",
      data: { event: newEvent },
    };

    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};

export default requestMiddleware(createEvent, {
  validation: { body: eventSchema },
});
