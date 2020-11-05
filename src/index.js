import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import HabitsList from "./pages/Habit";
import Journal from "./pages/Journal";
import UserLogin from "./pages/UserLogin";
import UserRegistration from "./pages/UserRegistration";
import About from "./pages/About";
import { AuthProvider } from "./context";

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
      <div className="container mt-3">
        <Switch>
          <Route exact path="/" component={About} />
          <Route exact path="/habits" component={HabitsList} />
          <Route exact path="/journal" component={Journal} />
          <Route exact path="/user/login" component={UserLogin} />
          <Route exact path="/user/register" component={UserRegistration} />
        </Switch>
      </div>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
