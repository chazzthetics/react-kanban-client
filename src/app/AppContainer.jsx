import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentBoard } from "../features/boards/boardsSlice";
import { getBackground } from "../utils/getBackground";
import { dashboard, board as boardPath } from "../utils/getPath";
import { Box } from "@chakra-ui/core";
import AppBar from "../components/AppBar";
import MainBoard from "../features/boards/components/MainBoard";
import "./App.css";

const AppContainer = () => {
  const { user } = useSelector(state => state.auth);
  const board = useSelector(selectCurrentBoard);

  const history = useHistory();

  useEffect(() => {
    if (!board) {
      history.replace(dashboard(user));
    } else {
      history.replace(boardPath(board));
    }
  }, [board, history, user]);

  return (
    <Box
      className="App"
      height="100vh"
      bg={board ? getBackground(board.background) : "gray.50"}
      bgImage={board ? getBackground(board.background) : ""}
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
