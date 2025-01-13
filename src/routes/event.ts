import { createEvent, getEvents } from "@/api/event-controller";
import express from "express";

const eventRoutes = express.Router();

eventRoutes.post("/", createEvent);
eventRoutes.get("/", getEvents);

export default eventRoutes;
