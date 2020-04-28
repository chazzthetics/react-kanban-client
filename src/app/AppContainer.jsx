import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hydrate } from "../features/auth/authSlice";
import { selectBoardBackground } from "../features/boards/boardsSlice";
import { getBackground } from "../utils/getBackground";
import { Box, Flex, Spinner } from "@chakra-ui/core";
import AppBar from "../components/AppBar";
import MainBoard from "../features/boards/components/MainBoard";
import "./App.css";

const AppContainer = () => {
  // const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const background = useSelector(selectBoardBackground);
  const { status, current } = useSelector(state => state.boards);

  const history = useHistory();
  useEffect(() => {
    if (!current) {
      history.push(`/${user.username}/boards`);
    }
  }, [current, history, user.username]);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     dispatch(hydrate());
  //   }
  // }, [dispatch, isAuthenticated]);

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

export default AppContainer;
