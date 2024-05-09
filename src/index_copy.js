import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import App from "./Components/app/App";
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    React.createElement(
        React.StrictMode,
        null,
        React.createElement(Provider, { store: store }, React.createElement(App, null))
    )
);
//# sourceMappingURL=index_copy.js.map
