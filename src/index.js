import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./js/store/index";
import App from "./js/components/App";
import 'bootstrap/dist/css/bootstrap.min.css';

import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "./js/react-auth0-spa";
import config from "./js/auth_config.json";
import history from "./js/utils/history";

const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

render(
  <Provider store={store}>
    <Auth0Provider
      domain={config.domain}
      client_id={config.clientId}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      audience={"https://hiit-tracker.com"}
    >
      <App />
    </Auth0Provider>

  </Provider>,
  document.getElementById("root")
);
