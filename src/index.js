import React from "react";
import ReactDOM from "react-dom/client";
// ------
// import { theme } from "./utils/styles";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@emotion/react";
import { store } from "./utils/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/* <ThemeProvider theme={theme}> */}
    <App />
    {/* </ThemeProvider> */}
  </Provider>
);
