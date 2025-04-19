import { config } from "../config/env";
import "./app";
import { server } from "./http";

server.listen(config.env.PORT, () => console.log(`Server is running on http://localhost:${config.env.PORT}`));