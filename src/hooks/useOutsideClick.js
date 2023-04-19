/** @format */

import { useEffect, useRef } from "react";
import "react-router-dom"; //would not build on AWS Elastic Beanstalk without this line.

export default function useOutsideClick(handle) {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) handle();
    };

    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, [ref]);

  return ref;
}
