import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeBoard } from "../boardsSlice";
import { getBackground } from "../../../utils/getBackground";
import { FiStar } from "react-icons/fi";
import { Text, Link, PseudoBox, Box } from "@chakra-ui/core";

const BoardBox = ({ board }) => {
  const dispatch = useDispatch();

  const handleChangeBoard = useCallback(() => {
    dispatch(changeBoard(board.uuid));
  }, [dispatch, board.uuid]);

  return (
    <Link
      as={RouterLink}
      key={board.uuid}
      to={`/b/${board.uuid}/${board.slug}`}
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
        _hover={{ opacity: 0.9 }}
        transition="opacity 100ms ease-in"
        shadow="md"
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
        />
        <Text
          color="white"
          fontSize="1.1rem"
          fontWeight={500}
          h="100%"
          w="100%"
          py={1}
          px={2}
          position="absolute"
          top={0}
          right={0}
          left={0}
          bottom={0}
        >
          {board.title}
        </Text>
        {board.is_starred && (
          <Box
            as={FiStar}
            color="yellow.400"
            aria-label="Star"
            position="absolute"
            bottom={2}
            right={2}
          />
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
