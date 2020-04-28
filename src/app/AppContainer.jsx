import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectBoardBackground } from "../features/boards/boardsSlice";
import { getBackground } from "../utils/getBackground";
import { dashboard } from "../utils/getPath";
import { Box } from "@chakra-ui/core";
import AppBar from "../components/AppBar";
import MainBoard from "../features/boards/components/MainBoard";
import "./App.css";

const AppContainer = () => {
  const { user } = useSelector(state => state.auth);
  const { current } = useSelector(state => state.boards);

  const background = useSelector(selectBoardBackground);

  const history = useHistory();

  useEffect(() => {
    if (!current) {
      history.replace(dashboard(user));
    }
  }, [current, history, user]);

  return (
    <Box
      className="App"
      height="100vh"
      bg={getBackground(background)}
      bgImage={getBackground(background)}
      bgPos="center"
      bgSize="cover"
      animation="180ms ease-in fadein"
    >
      <AppBar />
      <MainBoard />
    </Box>
  );
};

export default AppContainer;
