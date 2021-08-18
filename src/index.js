import ReactDOM from "react-dom";
import React from "react";
import { Provider } from "react-redux";

import server from "@Api/server";

import App from "@Components/App";

import store from "@Redux/store";

if (process.env.MODE === "development") {
  server();
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#app")
);
