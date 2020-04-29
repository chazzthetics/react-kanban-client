import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hydrate } from "../features/auth/authSlice";
import { boardsSelectors } from "../features/boards/boardsSlice";
import { labelsSelectors } from "../features/labels/labelsSlice";
import { FiStar, FiUser } from "react-icons/fi";
import { Box, Flex, Grid, Spinner } from "@chakra-ui/core";
import AppBar from "../components/AppBar";
import BoardGrid from "../features/boards/components/BoardGrid";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);

  const { status } = useSelector(state => state.boards);
  const labels = useSelector(state => labelsSelectors.selectTotal(state));

  const boards = useSelector(state => boardsSelectors.selectAll(state));
  const starredBoards = boards.filter(board => board.is_starred);

  useEffect(() => {
    if (isAuthenticated && !labels) {
      dispatch(hydrate());
    } else {
      return;
    }
  }, [dispatch, isAuthenticated, labels]);

  return (
    <Box
      className="Dashboard"
      height="100vh"
      bg="gray.50"
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
        <Grid
          templateColumns={"1fr 3fr"}
          px={{ sm: "5%", md: "10%", lg: "12%", xl: "16%" }}
          pt={12}
        >
          <Box
            as="aside"
            display={{ xs: "none", sm: "none", md: "none", lg: "block" }}
          >
            <div>Boards</div>
            <div>Boards</div>
            <div>Boards</div>
          </Box>

          {starredBoards.length > 0 && (
            <BoardGrid
              icon={FiStar}
              heading="Starred Boards"
              boards={starredBoards}
            />
          )}
          <BoardGrid icon={FiUser} heading="Personal Boards" boards={boards} />
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;
