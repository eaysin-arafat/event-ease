import dotenv from "dotenv";
import { z } from "zod";

// Load environment variables from .env file
const result = dotenv.config();
if (result.error) dotenv.config({ path: ".env.default" });

// Define the schema for environment variables
export const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.string().transform(Number),
  DB_CONNECTION_URL: z.string().url(),
  DB_NAME: z.string(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRATION: z.string(),
  APPLICATION_NAME: z.string(),
});

// Validate and parse environment variables
export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DB_CONNECTION_URL: process.env.DB_CONNECTION_URL,
  DB_NAME: process.env.DB_NAME,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRATION: process.env.JWT_EXPIRATION,
  APPLICATION_NAME: process.env.APPLICATION_NAME,
});

// Log success message in development mode
if (env.NODE_ENV === "development") {
  console.log("Environment variables successfully loaded:");
  // console.log(env);
}
