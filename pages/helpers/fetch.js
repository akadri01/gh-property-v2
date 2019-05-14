import fetch from "isomorphic-unfetch";
import { DOMAIN_NAME,HOST_PORT } from "../../globals.json";
import _isEmpty from "lodash.isempty";

const basePath =
  process.env.NODE_ENV === "development" ? HOST_PORT : DOMAIN_NAME;

export default async url => {
  let fetched = await fetch(`${basePath}${url}`);
  fetched = await fetched.json();
  const isUseful = Array.isArray(fetched) || !_isEmpty(fetched);
  return isUseful ? fetched : [];
};
