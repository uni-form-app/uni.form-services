import express from "express";
import { routers } from "../routes";
import { app } from "./http";
app
  .use(express.json())
  .use("/api/v1/", routers)