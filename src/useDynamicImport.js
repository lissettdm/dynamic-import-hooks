import React, { useState, useEffect } from "react";
import { errorHandler } from "./utils/errorHandler";
import { INITIAL_STATE, updateState } from "./utils/state";
import { getPath } from "./utils/pathHandler";

const useDinamycImport = (path, onLoad, cache = true) => {
    const [state, setState] = useState({...INITIAL_STATE});

    useEffect(() => {
      importExternal();
    }, []);
    
    console.log(state)
    const importExternal = () => {
      console.log(getPath(path, cache))
      import(/* webpackIgnore: true*/ getPath(path, cache))
        .then((_exports) => {
          console.log('rr')  
          onLoad(_exports);
        })
        .catch((err) => {
          console.log('rrr')  
  
          setState((prevState) =>
            updateState(prevState, { error: errorHandler(err) })
          );
        })
        .finally(() => {
          setState((prevState) => updateState(prevState, { loading: false }));
        });
    };
  
    return { ...state };
};

export default useDinamycImport;
