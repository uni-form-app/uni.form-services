import { config } from "../config";
import "./app";
import { server } from "./http";

server.listen(config.PORT, () => console.log(`Server is running on http://localhost:${config.PORT}`));