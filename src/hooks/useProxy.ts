import { useState, useRef } from "react";

const useProxy = <T extends object>(initialState: T) => {
  const [, setIndex] = useState(0);

  const proxy = useRef(
    new Proxy(initialState, {
      set(hostObject, prop, value) {
        hostObject[prop as keyof T] = value;
        setIndex((previousIndex) => previousIndex + 1);
        return true;
      },
    })
  );

  return proxy.current;
};

export default useProxy;
