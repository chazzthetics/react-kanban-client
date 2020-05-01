import React from "react";
import { useSelector } from "react-redux";
import { boardsSelectors } from "../features/boards/boardsSlice";
import { FiStar, FiUser } from "react-icons/fi";
import { Box, Grid } from "@chakra-ui/core";
import Spinner from "../components/Spinner";
import AppBar from "../components/AppBar";
import BoardGrid from "../features/boards/components/BoardGrid";

const Dashboard = () => {
  const { status } = useSelector(state => state.boards);

  const boards = useSelector(state => boardsSelectors.selectAll(state));
  const starredBoards = boards.filter(board => board.is_starred);

  return (
    <Box
      className="Dashboard"
      height="100vh"
      bg="gray.50"
      animation="200ms ease-in fadein"
    >
      <AppBar dashboard={true} />
      {status === "pending" && <Spinner />}
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
