import { DOMAIN_NAME } from "../../globals/globals.json";
import { HOST_PORT } from "../../globals/globals.json";

export const basePath =
  process.env.NODE_ENV === "development" ? HOST_PORT : HOST_PORT;
// : DOMAIN_NAME;
