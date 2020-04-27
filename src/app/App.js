import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hydrate } from "../features/auth/authSlice";
import { selectBoardBackground } from "../features/boards/boardsSlice";
import { getBackground } from "../utils/getBackground";
import { Box, Flex, Spinner } from "@chakra-ui/core";
import AppBar from "../components/AppBar";
import MainBoard from "../features/boards/components/MainBoard";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);
  const background = useSelector(selectBoardBackground);
  const { status } = useSelector(state => state.boards);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(hydrate());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <Box
      className="App"
      height="100vh"
      bg={getBackground(background)}
      bgImage={getBackground(background)}
      bgPos="center"
      bgSize="cover"
      animation="200ms ease-in fadein"
    >
      <AppBar />
      {status === "pending" && (
        <Flex justify="center" align="center" h="85vh">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="gray.500"
            size="xl"
          />
        </Flex>
      )}
      {status === "success" && <MainBoard />}
    </Box>
  );
};

export default App;
