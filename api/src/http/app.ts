import express from "express";
import { routers } from "../routes";
import { app } from "./http";
import { errorHandler } from "../middleware/errorHandler";
import path from "path";
import cors from "cors";

const uploadsPath = path.resolve(__dirname, "../../", "uploads");

app
  .use(express.json())
  .use(cors())
  .use("/api/v1/", routers)
  .use("/public", express.static(uploadsPath))
  .use(errorHandler)