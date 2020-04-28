import React from "react";
import PropTypes from "prop-types";
import { Box, Heading } from "@chakra-ui/core";
import SelectButton from "./SelectButton";

const SelectContainer = ({ icon, heading, boards, onClose }) => {
  return (
    <Box pb={2}>
      <Heading
        as="h4"
        fontSize="0.8rem"
        fontWeight={500}
        textTransform="uppercase"
        color="gray.500"
        py={3}
        display="flex"
        alignItems="center"
      >
        <Box as={icon} mx={1} fontSize="1.2rem" />
        {heading}
      </Heading>
      {boards.map(board => (
        <SelectButton key={board.uuid} board={board} onClose={onClose} />
      ))}
    </Box>
  );
};

SelectContainer.propTypes = {
  icon: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
  boards: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired
};

export default SelectContainer;
