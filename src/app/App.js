import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hydrate } from "../features/auth/authSlice";
import AppBar from "../components/AppBar";
import MainBoard from "../features/boards/components/MainBoard";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(hydrate());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <div className="App">
      <AppBar />
      <MainBoard />
    </div>
  );
};

export default App;
