/**
 **
 **  Fetches data from server & converts to json
 **
 **  Utility function for getInitialProps method
 **
 **/
import fetch from "isomorphic-unfetch";
import { DOMAIN_NAME } from "../../globals/globals.json";
import { HOST_PORT } from "../../globals/globals.json";

const basePath = process.env.NODE_ENV === "development" ? HOST_PORT : HOST_PORT; //: DOMAIN_NAME;

export default async url => {
  let fetched = await fetch(`${basePath}${url}`);
  fetched = await fetched.json();
  const isUseful = Array.isArray(fetched) || typeof fetched === "object";
  return isUseful ? fetched : [];
};
