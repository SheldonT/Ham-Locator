/** @format */

export const getStageURL = (window) => {
  const location = window.location.hostname;
  if (location.includes("localhost")) {
    return "http://localhost:3007";
  }
  return "aws-url-here";
};
