import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hydrate } from "../features/auth/authSlice";
import { boardsSelectors, changeBoard } from "../features/boards/boardsSlice";
import { labelsSelectors } from "../features/labels/labelsSlice";

import { Link } from "react-router-dom";
import { Box, Flex, Spinner } from "@chakra-ui/core";
import AppBar from "../components/AppBar";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);

  const boards = useSelector(state => boardsSelectors.selectAll(state));
  const labels = useSelector(state => labelsSelectors.selectTotal(state));
  const { status } = useSelector(state => state.boards);

  useEffect(() => {
    if (isAuthenticated && !labels) {
      dispatch(hydrate());
    } else {
      return;
    }
  }, [dispatch, isAuthenticated, labels]);

  const handleChangeBoard = React.useCallback(
    id => {
      dispatch(changeBoard(id));
    },
    [dispatch]
  );

  return (
    <Box
      className="Dashboard"
      height="100vh"
      bg="white"
      animation="200ms ease-in fadein"
    >
      <AppBar dashboard={true} />
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
      {status === "success" && (
        <div>
          <h1>Dashboard</h1>
          {boards.map(board => (
            <Link
              key={board.uuid}
              to={`/b/${board.uuid}/${board.slug}`}
              onClick={() => handleChangeBoard(board.uuid)}
            >
              {board.title}
            </Link>
          ))}
        </div>
      )}
    </Box>
  );
};

export default Dashboard;
