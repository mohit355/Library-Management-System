import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import "./index.css";
import App from "./App";
import authReducer from "./state/reducer/auth";
import catalogueReducer from "./state/reducer/catalogue";
import myBooksReducer from "./state/reducer/myBook";

// root reducre
const rootReducer = combineReducers({
  auth: authReducer,
  catalogue: catalogueReducer,
  myBooks: myBooksReducer,
});

// redux store
const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
