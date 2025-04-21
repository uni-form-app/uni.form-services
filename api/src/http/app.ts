import express from "express";
import { routers } from "../routes";
import { app } from "./http";
import { errorHandler } from "../middleware/errorHandler";
import path from "path";

const uploadsPath = path.resolve(__dirname, "../../", "uploads");

app
  .use(express.json())
  .use("/api/v1/", routers)
  .use("/public", express.static(uploadsPath))
  .use(errorHandler)