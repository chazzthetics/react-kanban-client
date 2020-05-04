import React, { useCallback } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { boardsSelectors } from "../features/boards/boardsSlice";
import { logout } from "../features/auth/authSlice";
import { dashboard } from "../utils/getPath";
import {
  FiStar,
  FiUser,
  FiTrello,
  FiGithub,
  FiArrowLeftCircle
} from "react-icons/fi";
import { Box, Grid, Stack } from "@chakra-ui/core";
import Spinner from "../components/Spinner";
import AppBar from "../components/AppBar";
import DashboardLink from "../components/DashboardLink";
import BoardGrid from "../features/boards/components/BoardGrid";

const Dashboard = () => {
  const { status } = useSelector(state => state.boards);
  const { user } = useSelector(state => state.auth);
  const boards = useSelector(state => boardsSelectors.selectAll(state));
  const starredBoards = boards.filter(board => board.is_starred);

  const dispatch = useDispatch();
  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

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
          px={{ sm: "5%", md: "10%", lg: "12%", xl: "18%" }}
          pt={12}
        >
          <Box
            as="aside"
            display={{ xs: "none", sm: "none", md: "none", lg: "block" }}
          >
            <Stack spacing={1}>
              <DashboardLink
                to={dashboard(user)}
                as={NavLink}
                bg="blue.100"
                color="blue.600"
              >
                <Box as={FiTrello} mr={2} color="inherit" />
                Boards
              </DashboardLink>
              <DashboardLink
                to={dashboard(user)}
                as="a"
                href="https://github.com/chazzthetics/react-kanban-client"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Box as={FiGithub} mr={2} color="inherit" /> Github
              </DashboardLink>
              <DashboardLink as="button" onClick={handleLogout}>
                <Box as={FiArrowLeftCircle} mr={2} color="inherit" /> Logout
              </DashboardLink>
            </Stack>
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
