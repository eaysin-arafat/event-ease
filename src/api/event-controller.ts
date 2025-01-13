import { Request, Response } from "express";
import Event from "../models/Event";

export const createEvent = async (req: Request, res: Response) => {
  const { name, date, location, maxAttendees } = req.body;
  const createdBy = req.user?.userId;

  try {
    const newEvent = new Event({
      name,
      date,
      location,
      maxAttendees,
      createdBy,
    });
    await newEvent.save();

    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find().populate("createdBy", "email");
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
