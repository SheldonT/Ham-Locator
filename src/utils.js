/** @format */

export const getStageURL = (window) => {
  const location = window.location.hostname;
  const apiHost =
    "http://ham-locator-server-2-112-env.eba-yrqebr4m.ca-central-1.elasticbeanstalk.com/";

  if (location.includes("localhost")) {
    return "http://localhost:3007";
  }
  return apiHost;
};
