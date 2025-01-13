import { registerAttendee } from "@/api/attendee-controller";
import express from "express";

const attendeesRoutes = express.Router();

attendeesRoutes.post("/register", registerAttendee);

export default attendeesRoutes;
