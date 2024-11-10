import express from "express";
import { get } from "mongoose";

const router = express.Router();

router.get("/trending", getTrendingMovie);

export default router;