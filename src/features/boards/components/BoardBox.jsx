import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeBoard, toggleBoardStar } from "../boardsSlice";
import { getBackground } from "../../../utils/getBackground";
import { board as boardPath } from "../../../utils/getPath";
import { FiStar } from "react-icons/fi";
import { Text, Link, PseudoBox, Box } from "@chakra-ui/core";

const BoardBox = ({ board }) => {
  const dispatch = useDispatch();

  const handleChangeBoard = useCallback(() => {
    dispatch(changeBoard(board.uuid));
  }, [dispatch, board.uuid]);

  const handleToggleStar = useCallback(
    boardId => {
      dispatch(toggleBoardStar(boardId));
    },
    [dispatch]
  );

  return (
    <Link
      as={RouterLink}
      key={board.uuid}
      to={boardPath(board)}
      onClick={handleChangeBoard}
      _focus={{ outline: "none" }}
    >
      <PseudoBox
        h={100}
        w="auto"
        borderRadius={3}
        bg={getBackground(board.background)}
        bgImage={getBackground(board.background)}
        bgPos="center"
        bgSize="cover"
        position="relative"
        zIndex={4}
        boxShadow="md"
        _hover={{ opacity: 0.9 }}
        transition="opacity 130ms ease-in, transform 130ms ease-in"
      >
        <PseudoBox
          w="100%"
          h="100%"
          position="absolute"
          top={0}
          right={0}
          left={0}
          bottom={0}
          borderRadius={3}
          background="rgba(0,0,0,0.2)"
          zIndex={6}
        />
        <Text
          color="white"
          fontSize="1rem"
          fontWeight={600}
          py={1}
          px={2}
          position="absolute"
          zIndex={10}
          top={0}
          right={0}
          left={0}
          bottom={0}
          wordBreak="break-word"
        >
          {board.title}
        </Text>
        {board.is_starred && (
          <Box
            position="absolute"
            bottom={2}
            right={2}
            zIndex={12}
            onClick={e => {
              e.preventDefault();
              handleToggleStar(board.uuid);
            }}
          >
            <PseudoBox
              as={FiStar}
              color="yellow.400"
              aria-label="Star"
              _hover={{
                transform: "rotate(180deg) scale(1.3)"
              }}
              transition="transform 300ms ease-in-out"
            />
          </Box>
        )}
      </PseudoBox>
    </Link>
  );
};

BoardBox.propTypes = {
  board: PropTypes.shape({
    uuid: PropTypes.string,
    slug: PropTypes.string,
    background: PropTypes.string
  }).isRequired
};

export default BoardBox;
