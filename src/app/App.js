import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hydrate } from "../features/auth/authSlice";
import { selectBoardBackground } from "../features/boards/boardsSlice";
import { isImage } from "../utils/isImage";
import { Box } from "@chakra-ui/core";
import AppBar from "../components/AppBar";
import MainBoard from "../features/boards/components/MainBoard";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);
  const background = useSelector(selectBoardBackground);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(hydrate());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <Box
      className="App"
      height="100vh"
      bg={isImage(background)}
      bgImage={isImage(background)}
      bgPos="center"
      bgSize="cover"
    >
      <AppBar />
      <MainBoard />
    </Box>
  );
};

export default App;
