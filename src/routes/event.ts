import { eventControllers } from "@/api";
import express from "express";

const eventRoutes = express.Router();

eventRoutes.post("/", eventControllers?.create);
eventRoutes.get("/", eventControllers?.getAll);

export default eventRoutes;
