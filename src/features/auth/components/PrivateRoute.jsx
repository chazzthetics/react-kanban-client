import React, { useEffect } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { hydrate } from "../authSlice";

const PrivateRoute = ({ children, ...rest }) => {
  const { status, isAuthenticated } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const location = useLocation();
  const from = location.pathname.split("/")[2] || "";

  useEffect(() => {
    if (status === "authenticated" && status !== "hydrated") {
      dispatch(hydrate(from));
    }
  }, [dispatch, status, from]);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
