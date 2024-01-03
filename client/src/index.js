import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { apiStore } from "./redux/apiStore";

let persistor = persistStore(apiStore);

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
      <Provider store={apiStore}>
          <PersistGate loading={null} persistor={persistor}>
            <SnackbarProvider
              maxSnack={3}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              autoHideDuration={1500}
              >
              <App />
            </SnackbarProvider>
            </PersistGate>
        </Provider>     
     </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();