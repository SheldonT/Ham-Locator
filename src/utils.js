/** @format */

export const getStageURL = (window) => {
  const location = window.location.hostname;
  const apiHost =
    "https://ham-locator-svr-https-env.eba-whsc5wsc.ca-central-1.elasticbeanstalk.com/";

  if (location.includes("localhost")) {
    return "http://localhost:3007";
  }
  return apiHost;
};
