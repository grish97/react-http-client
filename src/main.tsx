import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@store";
import { HttpClientProvider } from "@http";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <HttpClientProvider>
      <App />
    </HttpClientProvider>
  </Provider>
);
