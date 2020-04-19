import React, { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentBoard } from "../features/boards/boardsSlice";
import { login } from "../features/auth/authSlice";
import {
  Box,
  Flex,
  List,
  ButtonGroup,
  ListItem,
  Link,
  Heading
} from "@chakra-ui/core";
import { FiHome, FiSun } from "react-icons/fi";
import { GoMarkGithub } from "react-icons/go";
import SelectBoardInput from "../features/boards/components/SelectBoardInput";
import CreateBoardPopover from "../features/boards/components/CreateBoardPopover";
import UserAvatar from "../features/auth/components/UserAvatar";
import IconButton from "./IconButton";
import AppBarOverlay from "./AppBarOverlay";

const AppBar = () => {
  const currentBoard = useSelector(selectCurrentBoard);
  const dispatch = useDispatch();

  const handleTempLogin = useCallback(() => {
    dispatch(login());
  }, [dispatch]);

  return (
    <Box
      as="header"
      bg={currentBoard ? `${currentBoard.background}.600` : "blue.600"}
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
              <Link>
                <IconButton icon={FiHome} label="Dashboard" fontSize="1.3rem" />
              </Link>
            </ListItem>
            <ListItem d="flex" alignItems="center">
              <SelectBoardInput />
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
              opacity={0.8}
              _hover={{ opacity: 1 }}
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
              <UserAvatar onTempLogin={handleTempLogin} />
            </ListItem>
          </ButtonGroup>
        </List>
      </Flex>
    </Box>
  );
};

export default memo(AppBar);
