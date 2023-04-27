/** @format */

export const getStageURL = (window) => {
  const location = window.location.hostname;
  const apiHost =
    "http://ham-locator-server-4-env.eba-t7ewg8qf.ca-central-1.elasticbeanstalk.com";

  if (location.includes("localhost")) {
    return "http://localhost:3007";
  }
  return apiHost;
};
