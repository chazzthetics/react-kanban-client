import React, { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  boardsSelectors,
  selectCurrentBoard,
  changeBoard
} from "../features/boards/boardsSlice";
import {
  Box,
  Flex,
  List,
  ButtonGroup,
  ListItem,
  Link,
  IconButton,
  Select,
  Heading,
  Avatar
} from "@chakra-ui/core";
import { FiHome, FiSun } from "react-icons/fi";
import { GoMarkGithub } from "react-icons/go";

const AppBar = () => {
  const boards = useSelector(state => boardsSelectors.selectAll(state));
  const current = useSelector(selectCurrentBoard);

  const dispatch = useDispatch();
  const handleSelectChange = useCallback(
    e => {
      dispatch(changeBoard(e.target.value));
    },
    [dispatch]
  );

  return (
    <Box as="header" bg={"gray.400"} h="2.5rem" p={4}>
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
                />
              </Link>
            </ListItem>
            <ListItem d="flex" alignItems="center">
              <Select
                size="sm"
                borderRadius={4}
                bg="rgba(0,0,0,0.3)"
                border="none"
                color="#fff"
                fontWeight="700"
                cursor="pointer"
                value={current}
                onChange={handleSelectChange}
              >
                {boards.map(board => (
                  <option key={board.uuid} value={board.uuid}>
                    {board.title}
                  </option>
                ))}
              </Select>
            </ListItem>
          </ButtonGroup>
        </List>
        <Flex>
          <Heading fontSize="1rem" letterSpacing={0.8} fontWeight="600">
            REACT KANBAN
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
              <Avatar bg="green.400" size="sm" color="#fff" />
            </ListItem>
          </ButtonGroup>
        </List>
      </Flex>
    </Box>
  );
};

export default memo(AppBar);
