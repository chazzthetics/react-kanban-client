import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeBoard } from "../boardsSlice";
import { board as boardPath } from "../../../utils/getPath";
import { getBackground } from "../../../utils/getBackground";
import { FiStar } from "react-icons/fi";
import { Box, PseudoBox, Flex, Text } from "@chakra-ui/core";

const SelectButton = ({ board, onClose }) => {
  const dispatch = useDispatch();

  const handleChangeBoard = useCallback(
    id => {
      dispatch(changeBoard(id));
      onClose();
    },
    [dispatch, onClose]
  );

  return (
    <Link
      to={boardPath(board)}
      onClick={() => handleChangeBoard(board.uuid)}
      replace
    >
      <PseudoBox
        w="100%"
        mb={1}
        h="2.25rem"
        _hover={{ filter: "brightness(70%)" }}
        transition="filter ease-in 100ms"
      >
        <Flex h="100%" align="center" position="relative" borderRadius={3}>
          <PseudoBox
            h="100%"
            w="45px"
            bg={getBackground(board.background)}
            bgImage={getBackground(board.background)}
            bgPos="center"
            bgSize="cover"
            borderTopLeftRadius={3}
            borderBottomLeftRadius={3}
          />
          <PseudoBox
            h="100%"
            w="100%"
            opacity={0.4}
            bg={getBackground(board.background)}
            bgImage={getBackground(board.background)}
            bgPos="center"
            bgSize="cover"
            borderTopRightRadius={3}
            borderBottomRightRadius={3}
          />
          <Text
            fontWeight={700}
            fontSize="0.9rem"
            color="gray.800"
            textAlign="left"
            position="absolute"
            ml={12}
          >
            {board.title}
          </Text>
          {board.is_starred && (
            <Box
              as={FiStar}
              position="absolute"
              right={0}
              mr={2}
              fill="yellow.400"
              color="yellow.500"
            />
          )}
        </Flex>
      </PseudoBox>
    </Link>
  );
};

SelectButton.propTypes = {
  board: PropTypes.shape({
    uuid: PropTypes.string,
    background: PropTypes.string
  }).isRequired,
  onClose: PropTypes.func.isRequired
};

export default SelectButton;
