import React, { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import {
  Box,
  Flex,
  List,
  ButtonGroup,
  ListItem,
  Link,
  IconButton,
  Heading
} from "@chakra-ui/core";
import { FiHome, FiSun } from "react-icons/fi";
import { GoMarkGithub } from "react-icons/go";
import SelectBoardInput from "../features/boards/components/SelectBoardInput";
import UserAvatar from "../features/auth/components/UserAvatar";

const AppBar = () => {
  const dispatch = useDispatch();

  const handleTempLogin = useCallback(() => {
    dispatch(login());
  }, [dispatch]);

  return (
    <Box
      as="header"
      bg={"blue.600"}
      h="2.5rem"
      p={4}
      position="relative"
      w="100%"
    >
      <div
        className="overlay"
        style={{
          width: "100vw",
          height: "2.5rem",
          padding: "16px",
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.2)"
        }}
      ></div>

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
                <IconButton
                  icon={FiHome}
                  aria-label="Dashboard"
                  fontSize="1.3rem"
                  size="sm"
                  color="white"
                  bg="rgba(255,255,255,0.2)"
                />
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
            <a href="/">REACT KANBAN</a>
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
              <IconButton
                icon="add"
                aria-label="Create New Board"
                fontSize="1rem"
                size="sm"
              />
            </ListItem>
            <ListItem>
              <IconButton
                icon={GoMarkGithub}
                aria-label="Source Code"
                fontSize="1rrem"
                size="sm"
              />
            </ListItem>
            <ListItem>
              <IconButton
                icon={FiSun}
                aria-label="Dashboard"
                fontSize="1rem"
                size="sm"
              />
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
