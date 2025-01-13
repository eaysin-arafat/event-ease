import { registerAttendeeService } from "@/lib/attendee";
import { requestMiddleware } from "@/middleware/request-middleware";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const registerAttendeeSchema = z.object({
  eventId: z.string().uuid({ message: "Invalid eventId format" }),
});

export const registerAttendee = async (
  req: Request<{}, {}, { eventId: string }>,
  res: Response,
  next: NextFunction
) => {
  const { eventId } = req.body;
  const userId = req.user?.userId;

  try {
    const io = req.app.get("io");

    const { newAttendee } = await registerAttendeeService(eventId, userId, io);

    res
      .status(201)
      .json({ message: "Successfully registered", attendee: newAttendee });
  } catch (err) {
    next(err);
  }
};

export default requestMiddleware(registerAttendee, {
  validation: { body: registerAttendeeSchema },
});
