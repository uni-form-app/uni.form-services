import express from "express";
import { routers } from "../routes";
import { app } from "./http";
import { errorHandler } from "../middleware/errorHandler";
app
  .use(express.json())
  .use("/api/v1/", routers)
  .use(errorHandler)