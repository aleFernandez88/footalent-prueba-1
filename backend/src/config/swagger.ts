import swaggerJsdoc from "swagger-jsdoc";
import { SwaggerDefinition } from "swagger-jsdoc";

const swaggerDefinition: SwaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API - Footalent",
    version: "1.0.0",
    description: "Documentación de la API",
    contact: {
      name: "Support",
    },
  },
  servers: [
    {
      url: `http://${process.env.SWAGGER_HOST || "localhost:3000"}`,
      description: `${process.env.NODE_ENV || "Development"} server`,
    },
  ],
};

const options = {
  definition: swaggerDefinition,
  apis: ["./src/routes/*.ts", "./src/**/*.ts"], // Paths to files containing OpenAPI definitions
};

export const swaggerSpec = swaggerJsdoc(options);
