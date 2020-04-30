import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Dashboard from "../pages/Dashboard";
import AppContainer from "./AppContainer";

const Routes = () => {
  return (
    <Switch>
      <Route exact path={"/"}>
        <Redirect to="/login" />
      </Route>
      <Route exact path={"/login"}>
        <LoginPage />
      </Route>
      <Route exact path={"/register"}>
        <RegisterPage />
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
