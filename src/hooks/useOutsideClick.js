/** @format */

import { useEffect, useRef } from "react";

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
