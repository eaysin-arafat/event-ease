import { registerAttendee } from "@/api/attendee";
import express from "express";

const attendeesRoutes = express.Router();

attendeesRoutes.post("/register", registerAttendee);

export default attendeesRoutes;
