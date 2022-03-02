import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import { AuthContextProvider } from "./context/AuthContext";
import { transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { QueryClient, QueryClientProvider } from "react-query";
// import * as mdb from 'mdb-ui-kit';

const options = {
  // you can also just use 'bottom center'
  timeout: 4000,
  offset: "30px",
  color: "white",
  width: "400px",
  zindex: 100,

  // you can also just use 'scale'
  transition: transitions.SCALE,
};
const queryClient = new QueryClient();
ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AuthContextProvider>
  </AlertProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();