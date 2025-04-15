import { routers } from "../routes";
import { app } from "./http";

app
  .use("/api/v1/", routers)