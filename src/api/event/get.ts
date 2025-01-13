import { eventService } from "@/lib";
import { requestMiddleware } from "@/middleware/request-middleware";
import { NextFunction, Request, Response } from "express";

const getEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await eventService?.getAll();

    res.status(200).json(events);
  } catch (err) {
    next(err);
  }
};

export default requestMiddleware(getEvents);
