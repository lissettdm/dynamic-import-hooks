import React, { useState, useEffect } from "react";
import { errorHandler } from "./utils/errorHandler";
import { getPath } from "./utils/pathHandler";

const useDinamycScript = (path, onLoad, cache = true) => {
  const [state, setState] = useState({...INITIAL_STATE});

  useEffect(() => {
    importExternal()
      .then((_export) => {
        onLoad(_export);
      })
      .catch((err) => {
        setState((prevState) =>
          updateState(prevState, { error: errorHandler(err) })
        );
      })
      .finally(() => {
        setState((prevState) => updateState(prevState, { loading: false }));
      });
  }, []);

  const importExternal = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = getPath(path, cache);
      script.async = true;
      script.onload = resolve;
      script.type = "module";
      script.onerror = (err) => reject(err);
      document.body.appendChild(script);
    });
  };

  return { ...state };
};

export default useDinamycScript;
