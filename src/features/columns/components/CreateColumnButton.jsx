import React, { memo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  selectBoardColumnCount,
  selectBackgroundIsImage
} from "../../boards/boardsSlice";
import { PseudoBox, Icon } from "@chakra-ui/core";

const CreateColumnButton = ({ onShow }) => {
  const columnCount = useSelector(selectBoardColumnCount);
  const isImage = useSelector(selectBackgroundIsImage);

  return (
    <PseudoBox
      as="button"
      bg={isImage ? "hsla(0,0%,0%,0.3)" : "hsla(0,0%,100%,0.3)"}
      borderRadius={3}
      color="white"
      fontSize="0.9rem"
      px={2}
      py={2}
      aria-label="Add a list"
      display="flex"
      alignItems="center"
      w="100%"
      _hover={{
        backgroundColor: isImage ? "hsla(0,0%,0%,0.4)" : "hsla(0,0%,100%,0.2)"
      }}
      _active={{
        backgroundColor: isImage ? "hsla(0,0%,0%,0.5)" : "hsla(0,0%,100%,0.4)"
      }}
      _focus={{
        boxShadow: "none",
        outline: "none",
        backgroundColor: isImage ? "hsla(0,0%,0%,0.4)" : "hsla(0,0%,100%,0.2)"
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
