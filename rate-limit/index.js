import express from "express";
import "dotenv/config";
import { rateLimit } from "./middlewares/rateLimit.middleware.js";
import { corsConfig } from "./config/cors.config.js";
import { basicRouter } from "./routes/basic.router.js";


const startServer = async () => {
  try {
    const app = express();

    // Middleware for CORS
    app.use( corsConfig );

    // Use rate limit middleware globally
    app.use(rateLimit);

    // Define routes
    app.use('/api/v1/data' , basicRouter )


    // Start the server
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.info(`Server is running at http://localhost:${PORT}`);
    });


  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1); // Exit the process on server start failure
  }
};

startServer();
