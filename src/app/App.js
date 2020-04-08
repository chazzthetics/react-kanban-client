import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hydrate } from "../features/boards/boardsSlice";
import AppBar from "../components/AppBar";
import MainBoard from "../features/boards/components/MainBoard";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);

  React.useEffect(() => {
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
