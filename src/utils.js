/** @format */

export const getStageURL = (window) => {
  const location = window.location.hostname;
  const apiHost = "https://hamlocator.space";

  if (location.includes("localhost")) {
    return "http://localhost:3007";
  }
  return apiHost;
};
