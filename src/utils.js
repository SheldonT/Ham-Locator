/** @format */

export const getStageURL = (window) => {
  const location = window.location.hostname;
  const apiHost = process.env.REACT_APP_API_HOST;

  if (location.includes("localhost")) {
    return "http://localhost:3007";
  }
  return apiHost;
};
