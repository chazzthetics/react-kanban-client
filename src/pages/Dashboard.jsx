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
import { Box, Grid, Link, Stack } from "@chakra-ui/core";
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
                <div>Boards</div>
              </DashboardLink>

              <Link
                d="block"
                href="https://github.com/chazzthetics"
                rel="noopener noreferrer"
                target="_blank"
                fontWeight={700}
                bg="inherit"
                color="gray.700"
                w={"80%"}
                py={1}
                px={2}
                borderRadius={3}
                display="flex"
                alignItems="center"
                _hover={{ backgroundColor: "blue.100", color: "blue.700" }}
              >
                <Box as={FiGithub} mr={2} color="inherit" /> <div>Github</div>
              </Link>
              <Link
                d="block"
                onClick={handleLogout}
                fontWeight={700}
                bg="inherit"
                color="gray.700"
                w={"80%"}
                py={1}
                px={2}
                borderRadius={3}
                display="flex"
                alignItems="center"
                _hover={{ backgroundColor: "blue.100", color: "blue.700" }}
              >
                <Box as={FiArrowLeftCircle} mr={2} color="inherit" />
                <div>Logout</div>
              </Link>
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
