import React, { memo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectBoardColumnCount } from "../../boards/boardsSlice";
import { PseudoBox, Icon } from "@chakra-ui/core";

const CreateColumnButton = ({ onShow }) => {
  const columnCount = useSelector(selectBoardColumnCount);

  return (
    <PseudoBox
      as="button"
      bg="hsla(0,0%,0%,0.3)"
      borderRadius={3}
      color="white"
      fontSize="0.9rem"
      px={2}
      py={2}
      aria-label="Add a list"
      display="flex"
      alignItems="center"
      w="100%"
      _hover={{ backgroundColor: "hsla(0,0%,100%,0.2)" }}
      _active={{ backgroundColor: "hsla(0,0%,0%,0.3)" }}
      _focus={{
        boxShadow: "none",
        outline: "none",
        backgroundColor: "hsla(0,0%,100%,0.2)"
      }}
      onClick={onShow}
    >
      <Icon name="add" color="white" fontSize="0.7rem" mr={2} />
      {columnCount === 0 ? "Add a list" : "Add another list"}
    </PseudoBox>
  );
};

CreateColumnButton.propTypes = {
  onShow: PropTypes.func.isRequired
};

export default memo(CreateColumnButton);
