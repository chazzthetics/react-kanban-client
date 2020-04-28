import React, { memo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { selectBoardBackground } from "../features/boards/boardsSlice";
import {
  Box,
  Flex,
  List,
  ButtonGroup,
  ListItem,
  Link,
  Heading
} from "@chakra-ui/core";
import { getBackground } from "../utils/getBackground";
import { dashboard as dashboardPath } from "../utils/getPath";
import { FiHome, FiSun } from "react-icons/fi";
import { GoMarkGithub } from "react-icons/go";
import SelectBoardPopover from "../features/boards/components/SelectBoardPopover";
import CreateBoardPopover from "../features/boards/components/CreateBoardPopover";
import UserAvatar from "../features/auth/components/UserAvatar";
import IconButton from "./IconButton";
import AppBarOverlay from "./AppBarOverlay";

const AppBar = ({ dashboard = false }) => {
  const { user } = useSelector(state => state.auth);

  const background = useSelector(selectBoardBackground);

  return (
    <Box
      as="header"
      bg={dashboard ? "blue.600" : getBackground(background)}
      h="2.5rem"
      position="relative"
      w="100%"
      px={4}
    >
      <AppBarOverlay />
      <Flex as="nav" align="center" justify="space-between" h="100%">
        <List
          d="flex"
          alignItems="center"
          justifyContent="flex-start"
          flexBasis="12rem"
        >
          <ButtonGroup d="flex" spacing={1}>
            <ListItem mr={1}>
              <Link as={RouterLink} to={dashboardPath(user)}>
                <IconButton icon={FiHome} label="Dashboard" fontSize="1.3rem" />
              </Link>
            </ListItem>
            <ListItem d="flex" alignItems="center">
              <SelectBoardPopover />
            </ListItem>
          </ButtonGroup>
        </List>
        <Flex>
          <Heading
            fontSize="1rem"
            letterSpacing={0.8}
            fontWeight="600"
            color="white"
            zIndex={10}
          >
            <Link
              href="/"
              opacity={0.9}
              _hover={{ opacity: 1 }}
              _focus={{ outline: "none" }}
              transition="opacity 100ms ease-in"
            >
              REACT KANBAN
            </Link>
          </Heading>
        </Flex>
        <List
          d="flex"
          alignItems="center"
          justifyContent="flex-end"
          flexBasis="12rem"
        >
          <ButtonGroup d="flex" spacing={1}>
            <ListItem>
              <CreateBoardPopover />
            </ListItem>
            <ListItem>
              <IconButton icon={GoMarkGithub} label="Source Code" />
            </ListItem>
            <ListItem>
              <IconButton icon={FiSun} label="Change Theme" />
            </ListItem>
            <ListItem>
              <UserAvatar />
            </ListItem>
          </ButtonGroup>
        </List>
      </Flex>
    </Box>
  );
};

AppBar.propTypes = {
  dashboard: PropTypes.bool
};

export default memo(AppBar);
