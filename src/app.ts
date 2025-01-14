import { env } from "@/env";
import { errorHandler } from "@/middleware/error-handler";
import routes from "@/routes";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import helmet from "helmet";
import path from "path";
import defaultConfig from "./config/default";
import { setupSwagger } from "./config/swagger";
import NotFoundError from "./errors/not-found-error";
import { authenticateJWT } from "./middleware/authenticate-jwt";

// Initialize Express application
const app: Application = express();

// Middleware configuration
app.use(cors());
app.use(compression());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));

// Public routes configuration
const isPublicRoute = (path: string): boolean => {
  return (
    path === "/" ||
    defaultConfig.publicRoute.some((route) => path.startsWith(route))
  );
};

// Middleware for public route checking and JWT authentication
app.use((req: Request, res: Response, next: NextFunction) => {
  if (isPublicRoute(req.path)) return next();
  authenticateJWT(req, res, next);
});

// Setup Swagger (Development only)
setupSwagger(app);

// Root route
app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// API routes
app.use("/api/v1", routes);

// Health check endpoint
app.get("/health", (_req, res) => {
  res.status(200).json({ status: `${env.APPLICATION_NAME} service is up` });
});

// 404 Error handler for unknown routes
app.use((_req, _res, next) => {
  const error = new NotFoundError();
  next(error);
});

// Global error handler middleware
app.use(errorHandler);

export default app;
