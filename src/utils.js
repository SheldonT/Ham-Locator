/** @format */

export const getStageURL = (window) => {
  const location = window.location.hostname;
  //const apiHost = "https://hamlocator.space";
  const apiHost = "https://hamlocator.space:3007";

  if (location.includes("localhost")) {
    return "http://localhost:3007";
  }
  return apiHost;
};
