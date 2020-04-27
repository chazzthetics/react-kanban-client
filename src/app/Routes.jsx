import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import AppContainer from "./AppContainer";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/login">
        <LoginPage />
      </Route>
      <Route exact path="/register">
        <h1>Register</h1>
      </Route>
      <Route exact path={`/:username/boards`}>
        <Dashboard />
      </Route>
      <Route exact path={`/b/:uuid/:slug`}>
        <AppContainer />
      </Route>
    </Switch>
  );
};

export default Routes;
