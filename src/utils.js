/** @format */

export const getStageURL = (window) => {
  const location = window.location.hostname;
  if (location.includes("localhost")) {
    return "http://localhost:3007";
  }
  return "http://hamlocatorserver3-env.eba-2rhnj3me.ca-central-1.elasticbeanstalk.com/";
};
