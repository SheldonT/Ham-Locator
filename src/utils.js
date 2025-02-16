/** @format */

export const getStageURL = (window) => {
  const location = window.location.hostname;
  //const apiHost = "https://hamlocator.space";
  const apiHost =
    " https://ham-locator-server-383972071360.northamerica-northeast1.run.app";

  if (location.includes("localhost")) {
    return "http://localhost:3007";
  }
  return apiHost;
};
