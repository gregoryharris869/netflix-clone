import express from "express";

import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";

import { ENV_VARS } from "./config/enVars.js";
import { connectDB } from "./config/db.js";

const app = express();

const PORT = ENV_VARS.PORT;

// for parsing application/json
app.use(express.json()); 

// auth routes
app.use("/api/v1/auth", authRoutes);

// movie routes
app.use("/api/v1/movie", movieRoutes);

app.listen(PORT, () => {
  console.log("server is running on http://localhost:" + PORT);
  connectDB();
});


