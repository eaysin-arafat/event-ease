import { Router } from "express";

import attendeesRoutes from "./attendee";
import authRoutes from "./auth";
import eventRoutes from "./event";

const router = Router();

router.use("/auth", authRoutes);
router.use("/events", eventRoutes);
router.use("/attendees", attendeesRoutes);

export default router;
