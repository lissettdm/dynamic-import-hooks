# Dynamic import hooks

## Getting Started

npm install dynamic-import-hooks

**Requires react as a peer dependency.**

## Usage


```javascript
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {useDynamicImport} from "dynamic-import-hooks";

// return HTMLElement
createElement(
  SomeReactComponent, // component
  {
    tagName: "timer-ce", // tag name for custom element
    properties: ["name"], // properties
    customEvents: ["onUpdate"], // events
  }
);

const App = () => {
  const [name, setName] = useState("timer");
  useEffect(() => {
    setInterval(() => {
      // property changes
      setName(new Date().getTime());
      console.log("change");
    }, 3000);

    // listen onUpdate
    document
      .getElementsByTagName("timer-ce")[0]
      .addEventListener("onUpdate", (e) => console.log("updated"));
  });
  return <timer-ce name={name} />;
};
ReactDOM.render(<App />, document.getElementById("root"));
```

## With Shadow DOM

```javascript
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import createElement from "react-create-custom-element";

createElement(
  SomeReactComponent, // component
  {
    tagName: "timer-ce", // tag name for custom element
    properties: ["name"], // properties
    customEvents: ["onUpdate"], // events
    shadowDOM: true,
    mode: "open", // 'open' || 'close'
  }
);

const App = () => {
  const [name, setName] = useState("timer");
  useEffect(() => {
    setInterval(() => {
      // property changes
      setName(new Date().getTime());
      console.log("change");
    }, 3000);

    // listen onUpdate
    document
      .getElementsByTagName("timer-ce")[0]
      .addEventListener("onUpdate", (e) => console.log("updated"));
  });
  return <timer-ce name={name} />;
};
ReactDOM.render(<App />, document.getElementById("root"));
```

## Get the HTLMElement and then define the custom element

```javascript
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import createElement from "react-create-custom-element";

const App = () => {
  useEffect(() => {
    
    /** notice the tagName property is missing.
     * The custom element won't be created */
    const htmlElement = createElement(
      SomeReactComponent, // component
      {
        shadowDOM: true,
        mode: "open", // 'open' || 'close'
      }
    );

    // Now we can use the custom element
    window.customElements.define("timer-ce", htmlElement);
  });
  return <timer-ce name={name} />;
};
ReactDOM.render(<App />, document.getElementById("root"));
```
