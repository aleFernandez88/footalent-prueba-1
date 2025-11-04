import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import routes from "./routes";

// Load environment variables
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes
app.use("/api", routes);

// Root endpoint
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Welcome to Footalent API",
    version: "1.0.0",
    documentation: "/api-docs",
    health: "/api/health",
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handler
app.use(
  (err: Error, req: Request, res: Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
  console.log(`🔍 Health Check: http://localhost:${PORT}/api/health`);
});

export default app;
