import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentBoard } from "../features/boards/boardsSlice";
import { getBackground } from "../utils/getBackground";
import { board as boardPath } from "../utils/getPath";
import { Box } from "@chakra-ui/core";
import AppBar from "../components/AppBar";
import Spinner from "../components/Spinner";
import MainBoard from "../features/boards/components/MainBoard";
import "./App.css";

const AppContainer = () => {
  const { status } = useSelector(state => state.auth);
  const board = useSelector(selectCurrentBoard);

  const history = useHistory();

  useEffect(() => {
    if (board) {
      history.replace(boardPath(board));
    }
  }, [board, history]);

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
      {status === "pending" ? <Spinner /> : <MainBoard />}
    </Box>
  );
};

export default AppContainer;
