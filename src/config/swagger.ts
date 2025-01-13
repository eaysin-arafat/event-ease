import { env } from "@/env";
import { Application } from "express";
import fs from "fs";
import yaml from "js-yaml";
import path from "path";
import swaggerUi from "swagger-ui-express";

export const setupSwagger = (app: Application) => {
  if (env.NODE_ENV !== "development") return;

  const SWAGGER_YAML_FILEPATH = path.join(__dirname, "../openapi.yml");
  const swaggerYaml = yaml.load(
    fs.readFileSync(SWAGGER_YAML_FILEPATH, "utf8")
  ) as object;

  const swaggerUiOptions = {
    customCss: ".swagger-ui .topbar { display: none }",
  };

  app.use("/dev/api-docs", swaggerUi.serve);
  app.get("/dev/api-docs", swaggerUi.setup(swaggerYaml, swaggerUiOptions));
};
