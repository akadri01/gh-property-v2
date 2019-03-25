import fetch from "isomorphic-unfetch";
import { basePath } from "./basePath.js";

export default async url => {
  let fetched = await fetch(`${basePath}${url}`);
  fetched = await fetched.json();
  const isUseful = Array.isArray(fetched) || typeof fetched === "object";
  return isUseful ? fetched : [];
};
